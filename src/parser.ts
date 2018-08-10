import * as CustomDOMParser from 'xmldom';

interface ActiveXObject {
  new (s: string): any;
}

declare var ActiveXObject: ActiveXObject;

export class Parser {
  public static parseXml(xml: string) {
    if (xml === undefined) {
      return null;
    }

    if (typeof xml !== 'string') {
      return null;
    }

    let parser = null;
    let domNode = null;
    let isNode = false;

    // Check if we are on nodejs
    if (typeof module === 'object' && module.exports) {
      isNode = true;
    }

    if (isNode && CustomDOMParser) {
      // This branch is used for node.js, with the xmldom parser.
      parser = new CustomDOMParser.DOMParser();
      domNode = parser.parseFromString(xml, 'text/xml');
    } else if (DOMParser) {
      parser = new DOMParser();
      let parsererrorNS = null;

      const isIEParser = 'ActiveXObject' in window; // TODO : Test

      // IE9+ now is here
      if (!isIEParser) {
        try {
          parsererrorNS = parser.parseFromString('INVALID', 'text/xml')
            .childNodes[0].namespaceURI;
        } catch (err) {
          parsererrorNS = null;
        }
      }

      try {
        domNode = parser.parseFromString(xml, 'text/xml');
        if (
          parsererrorNS !== null &&
          domNode.getElementsByTagNameNS(parsererrorNS, 'parsererror').length >
            0
        ) {
          domNode = null;
        }
      } catch (err) {
        domNode = null;
      }
    } else {
      // IE :(
      if (xml.indexOf('<?') === 0) {
        xml = xml.substr(xml.indexOf('?>') + 2);
      }

      /* global ActiveXObject */
      domNode = new ActiveXObject('Microsoft.XMLDOM'); // TODO : Test
      domNode.async = 'false';
      domNode.loadXML(xml);
    }

    return domNode;
  }
}
