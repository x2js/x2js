import { X2JSConfig } from './config'
export class Serializer {
  private config: X2JSConfig

  constructor(config: X2JSConfig) {
    this.config = config
  }

  public serializeJavaScriptObjectChildren(jsObject: any) {
    let result = ''

    const elementCount = this.getDataElementCount(jsObject)

    if (elementCount > 0) {
      for (const elementName in jsObject) {
        if (this.isSpecialProperty(jsObject, elementName)) {
          continue
        }

        const element = jsObject[elementName]
        const attributes = this.getDataAttributeNames(element)

        result += this.serializeJavaScriptObject(element, elementName, attributes)
      }
    }

    result += this.serializeTextNodeContents(jsObject)

    return result
  }

  public serializeJavaScriptObject(element: any, elementName: any, attributes: any) {
    let result = ''

    // Filter out elements
    if (
      this.config.jsAttributeFilter &&
      this.config.jsAttributeFilter.call(null, elementName, element)
    ) {
      return result
    }
    // Convert element
    if (this.config.jsAttributeConverter) {
      element = this.config.jsAttributeConverter.call(null, elementName, element)
    }
    if (
      (element === undefined || element === null || element === '') &&
      this.config.selfClosingElements
    ) {
      result += this.serializeStartTag(element, elementName, attributes, true)
    } else if (typeof element === 'object') {
      if (Object.prototype.toString.call(element) === '[object Array]') {
        result += this.serializeArray(element, elementName, attributes)
      } else if (element instanceof Date) {
        result += this.serializeStartTag(element, elementName, attributes, false)
        // Serialize date
        result += this.config.jsDateUTC ? element.toUTCString() : element.toISOString()
        result += this.serializeEndTag(element, elementName)
      } else {
        const childElementCount = this.getDataElementCount(element)
        if (childElementCount > 0 || element.__text || element.__cdata) {
          result += this.serializeStartTag(element, elementName, attributes, false)
          result += this.serializeJavaScriptObjectChildren(element)
          result += this.serializeEndTag(element, elementName)
        } else if (this.config.selfClosingElements) {
          result += this.serializeStartTag(element, elementName, attributes, true)
        } else {
          result += this.serializeStartTag(element, elementName, attributes, false)
          result += this.serializeEndTag(element, elementName)
        }
      }
    } else {
      result += this.serializeStartTag(element, elementName, attributes, false)
      result += this.serializeTextNodeContents(element)
      result += this.serializeEndTag(element, elementName)
    }

    return result
  }

  private serializeStartTag(
    jsObject: any,
    elementName: string,
    attributeNames: string[],
    selfClosing: boolean
  ) {
    let resultStr =
      '<' + (jsObject && jsObject.__prefix ? jsObject.__prefix + ':' : '') + elementName

    if (attributeNames) {
      for (let i = 0; i < attributeNames.length; i++) {
        const attributeName = attributeNames[i]
        let attributeValue = jsObject[attributeName]

        if (this.config.escapeMode) {
          attributeValue = this.escapeXmlChars(attributeValue)
        }

        resultStr += ' ' + attributeName.substr(this.config.attributePrefix.length) + '='

        if (this.config.useDoubleQuotes) {
          resultStr += '"' + attributeValue + '"'
        } else {
          resultStr += "'" + attributeValue + "'"
        }
      }
    }

    if (!selfClosing) {
      resultStr += '>'
    } else {
      resultStr += ' />'
    }

    return resultStr
  }

  private serializeEndTag(jsObject: any, elementName: string) {
    return '</' + (jsObject && jsObject.__prefix ? jsObject.__prefix + ':' : '') + elementName + '>'
  }

  private serializeComplexTextNodeContents(textNode: any) {
    let result = ''

    if (textNode.__cdata) {
      result += '<![CDATA[' + textNode.__cdata + ']]>'
    }

    if (textNode.__text) {
      if (this.config.escapeMode) {
        result += this.escapeXmlChars(textNode.__text)
      } else {
        result += textNode.__text
      }
    }

    return result
  }

  private serializeArray(elementArray: any, elementName: string, attributes: string[]) {
    let result = ''

    if (elementArray.length === 0) {
      result += this.serializeStartTag(elementArray, elementName, attributes, true)
    } else {
      for (let i = 0; i < elementArray.length; i++) {
        result += this.serializeJavaScriptObject(
          elementArray[i],
          elementName,
          this.getDataAttributeNames(elementArray[i])
        )
      }
    }

    return result
  }

  private escapeXmlChars(str: string) {
    if (typeof str === 'string') {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
    } else {
      return str
    }
  }

  private serializeTextNodeContents(textNode: any) {
    let result = ''

    if (textNode instanceof Object) {
      result += this.serializeComplexTextNodeContents(textNode)
    } else if (textNode !== null) {
      if (this.config.escapeMode) {
        result += this.escapeXmlChars(textNode)
      } else {
        result += textNode
      }
    }

    return result
  }

  private getDataElementCount(jsObject: any) {
    let count = 0

    if (jsObject instanceof Object) {
      for (const propertyName in jsObject) {
        if (this.isSpecialProperty(jsObject, propertyName)) {
          continue
        }

        count++
      }
    }

    return count
  }

  private endsWith(str: string, suffix: string) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1
  }

  private isSpecialProperty(jsonObj: any, propertyName: string) {
    if (
      (this.config.arrayAccessForm === 'property' &&
        this.endsWith(propertyName.toString(), '_asArray')) ||
      propertyName.toString().indexOf(this.config.attributePrefix) === 0 ||
      propertyName.toString().indexOf('__') === 0 ||
      jsonObj[propertyName] instanceof Function
    ) {
      return true
    } else {
      return false
    }
  }

  private getDataAttributeNames(jsObject: any) {
    const names = []

    if (jsObject instanceof Object) {
      for (const attributeName in jsObject) {
        if (
          attributeName.toString().indexOf('__') === -1 &&
          attributeName.toString().indexOf(this.config.attributePrefix) === 0
        ) {
          names.push(attributeName)
        }
      }
    }

    return names
  }
}
