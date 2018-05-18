import { X2JSConfig } from './config';
import { Polyfills } from './polyfills';
import { Deserializer } from './deserializer';
import { Converter } from './converter';
import { Serializer } from './serializer';
import { Parser } from './parser';

export * from './config';

export default class X2JS {
  private config: X2JSConfig;
  private deserializer: Deserializer;
  private serializer: Serializer;

  constructor(config?: X2JSConfig) {
    Polyfills.init();
    this.config = { ...new X2JSConfig(), ...config };

    this.deserializer = new Deserializer(this.config);
    this.serializer = new Serializer(this.config);
  }

  public asArray(prop: any): any[] {
    if (prop === undefined || prop === null) {
      return [];
    } else if (prop instanceof Array) {
      return prop;
    } else {
      return [prop];
    }
  }

  public toXmlDateTime(dt: Date | number): string | null {
    if (dt instanceof Date) {
      return dt.toISOString();
    } else if (typeof dt === 'number') {
      return new Date(dt).toISOString();
    } else {
      return null;
    }
  }

  public asDateTime(prop: any): Date | any {
    if (typeof prop === 'string') {
      return Converter.xmlDateTimeToDate(prop);
    } else {
      return prop;
    }
  }

  public xml2dom(xml: string): any {
    return Parser.parseXml(xml);
  }

  public dom2js(domNode: any): any {
    return this.deserializer.deserializeDomChildren(domNode, null);
  }

  public js2dom(jsObject: any): any {
    const xml = this.js2xml(jsObject);
    return Parser.parseXml(xml);
  }

  public xml2js(xml: string): any {
    const domNode = Parser.parseXml(xml);
    if (domNode != null) {
      return this.dom2js(domNode);
    } else {
      return null;
    }
  }

  public js2xml(jsObject: any): any {
    return this.serializer.serializeJavaScriptObjectChildren(jsObject);
  }
}
