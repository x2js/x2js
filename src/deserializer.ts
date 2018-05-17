import { Config } from './config'
import { Converter } from './converter'
export class Deserializer {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  public deserializeRootElementChildren(rootElement: any) {
    let result: { [key: string]: number } = {}
    const children = rootElement.childNodes

    // Alternative for firstElementChild which is not supported in some environments
    for (let i = 0; i < children.length; i++) {
      let child = children.item(i)
      if (child.nodeType === DOMNodeTypes.ELEMENT_NODE) {
        let childName = this.getDomNodeLocalName(child)

        if (this.config.ignoreRoot) {
          result = this.deserializeDomChildren(child, childName)
        } else {
          result[childName] = this.deserializeDomChildren(child, childName)
        }
      }
    }

    return result
  }

  public deserializeDomChildren(node: any, parentPath: any) {
    if (node.nodeType === DOMNodeTypes.DOCUMENT_NODE) {
      return this.deserializeRootElementChildren(node)
    } else if (node.nodeType === DOMNodeTypes.ELEMENT_NODE) {
      return this.deserializeElementChildren(node, parentPath)
    } else if (
      node.nodeType === DOMNodeTypes.TEXT_NODE ||
      node.nodeType === DOMNodeTypes.CDATA_SECTION_NODE
    ) {
      return node.nodeValue
    } else {
      return null
    }
  }

  public deserializeElementChildren(element: any, elementPath: any) {
    let result: { [key: string]: any } = {}
    result.__cnt = 0

    const nodeChildren = element.childNodes

    // Child nodes.
    for (let iChild = 0; iChild < nodeChildren.length; iChild++) {
      const child = nodeChildren.item(iChild)
      const childName = this.getDomNodeLocalName(child)

      if (child.nodeType === DOMNodeTypes.COMMENT_NODE) {
        continue
      }

      result.__cnt++

      // We deliberately do not accept everything falsey here because
      // elements that resolve to empty string should still be preserved.
      if (result[childName] == null) {
        result[childName] = this.deserializeDomChildren(
          child,
          elementPath + '.' + childName
        )
        this.ensureProperArrayAccessForm(
          result,
          childName,
          elementPath + '.' + childName
        )
      } else {
        if (!(result[childName] instanceof Array)) {
          result[childName] = [result[childName]]
          this.ensureProperArrayAccessForm(
            result,
            childName,
            elementPath + '.' + childName
          )
        }

        result[childName][
          result[childName].length
        ] = this.deserializeDomChildren(child, elementPath + '.' + childName)
      }
    }

    // Attributes
    for (
      let iAttribute = 0;
      iAttribute < element.attributes.length;
      iAttribute++
    ) {
      const attribute = element.attributes.item(iAttribute)
      result.__cnt++

      let adjustedValue = attribute.value
      for (
        let iConverter = 0;
        iConverter < this.config.attributeConverters.length;
        iConverter++
      ) {
        const converter = this.config.attributeConverters[iConverter]
        if (converter.test.call(null, attribute.name, attribute.value)) {
          adjustedValue = converter.convert.call(
            null,
            attribute.name,
            attribute.value
          )
        }
      }

      result[this.config.attributePrefix + attribute.name] = adjustedValue
    }

    // Node namespace prefix
    const namespacePrefix = element.prefix
    if (namespacePrefix) {
      result.__cnt++
      result.__prefix = namespacePrefix
    }

    if (result['#text']) {
      result.__text = result['#text']

      if (result.__text instanceof Array) {
        result.__text = result.__text.join('\n')
      }

      if (this.config.escapeMode) {
        result.__text = this.unescapeXmlChars(result.__text)
      }

      if (this.config.stripWhitespaces) {
        result.__text = result.__text.trim()
      }

      delete result['#text']

      if (this.config.arrayAccessForm === 'property') {
        delete result['#text_asArray']
      }

      result.__text = this.convertToDateIfRequired(
        result.__text,
        '#text',
        elementPath + '.#text'
      )
    }

    if (result.hasOwnProperty('#cdata-section')) {
      result.__cdata = result['#cdata-section']
      delete result['#cdata-section']

      if (this.config.arrayAccessForm === 'property') {
        delete result['#cdata-section_asArray']
      }
    }

    if (result.__cnt === 1 && result.__text) {
      result = result.__text
    } else if (result.__cnt === 0 && this.config.emptyNodeForm === 'text') {
      result = {}
    } else if (
      result.__cnt > 1 &&
      result.__text !== undefined &&
      this.config.skipEmptyTextNodesForObj
    ) {
      if (
        (this.config.stripWhitespaces && result.__text === '') ||
        result.__text.trim() === ''
      ) {
        delete result.__text
      }
    }
    delete result.__cnt

    /**
         * We are checking if we are creating a __cdata property or if we just add the content of cdata inside result.
         * But, if we have a property inside xml tag (<tag PROPERTY="1"></tag>), and a cdata inside, we can't ignore it.
         * In this case we are keeping __cdata property.
         */
    if (
      !this.config.keepCData &&
      (!result.hasOwnProperty('__text') &&
        result.hasOwnProperty('__cdata') &&
        Object.keys(result).length === 1)
    ) {
      return result.__cdata ? result.__cdata : ''
    }

    if (this.config.enableToStringFunc && (result.__text || result.__cdata)) {
      result.toString = function toString() {
        return (
          (this.__text ? this.__text : '') + (this.__cdata ? this.__cdata : '')
        )
      }
    }

    return result
  }

  private getDomNodeLocalName(domNode: any) {
    let localName = domNode.localName
    if (localName == null) {
      // Yeah, this is IE!!
      localName = domNode.baseName
    }
    if (localName == null || localName === '') {
      // ==="" is IE too
      localName = domNode.nodeName
    }
    return localName
  }

  private ensureProperArrayAccessForm(
    element: any,
    childName: any,
    elementPath: any
  ) {
    switch (this.config.arrayAccessForm) {
      case 'property':
        if (!(element[childName] instanceof Array)) {
          element[childName + '_asArray'] = [element[childName]]
        } else {
          element[childName + '_asArray'] = element[childName]
        }
        break
    }

    if (
      !(element[childName] instanceof Array) &&
      this.config.arrayAccessFormPaths.length > 0
    ) {
      let match = false

      for (let i = 0; i < this.config.arrayAccessFormPaths.length; i++) {
        const arrayPath = this.config.arrayAccessFormPaths[i]
        if (typeof arrayPath === 'string') {
          if (arrayPath === elementPath) {
            match = true
            break
          }
        } else if (arrayPath instanceof RegExp) {
          if (arrayPath.test(elementPath)) {
            match = true
            break
          }
        } else if (typeof arrayPath === 'function') {
          if (arrayPath(childName, elementPath)) {
            match = true
            break
          }
        }
      }

      if (match) {
        element[childName] = [element[childName]]
      }
    }
  }

  private convertToDateIfRequired(
    value: any,
    childName: string,
    fullPath: string
  ) {
    if (this.config.datetimeAccessFormPaths.length > 0) {
      const pathWithoutTextNode = fullPath.split('.#')[0]

      for (let i = 0; i < this.config.datetimeAccessFormPaths.length; i++) {
        const candidatePath = this.config.datetimeAccessFormPaths[i]
        if (typeof candidatePath === 'string') {
          if (candidatePath === pathWithoutTextNode) {
            return Converter.xmlDateTimeToDate(value)
          }
        } else if (candidatePath instanceof RegExp) {
          if (candidatePath.test(pathWithoutTextNode)) {
            return Converter.xmlDateTimeToDate(value)
          }
        } else if (typeof candidatePath === 'function') {
          if (candidatePath(pathWithoutTextNode)) {
            return Converter.xmlDateTimeToDate(value)
          }
        }
      }
    }

    return value
  }

  private unescapeXmlChars(str: any) {
    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&')
  }
}

export enum DOMNodeTypes {
  ELEMENT_NODE = 1,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9
}
