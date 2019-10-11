/**
 * Transforms between XML string and JavaScript object trees.
 * 
 * @class X2JS
 */
declare class X2JS {
    
    /**
     * Creates an instance of X2JS.
     * 
     * @param {X2JS.Options} [config]
     * 
     * @memberOf X2JS
     */
    constructor(config?: X2JS.Options);

    /**
     * Converts the provided property into an array. If the property is already an Array then it will return unchanged.
     * 
     * @template T
     * @param {(T | Array<T>)} prop
     * @returns {Array<T>}
     * 
     * @memberOf X2JS
     */
    asArray<T>(prop: T | Array<T>): Array<T>;

    /**
     * Converts the provided date value to a valid XML string.
     * 
     * @param {(Date | number)} dt
     * @returns {string}
     * 
     * @memberOf X2JS
     */
    toXmlDateTime(dt: Date | number): string;

    /**
     * Converts the provided date string into a javascript Date instance.
     * 
     * @param {string} prop
     * @returns {Date}
     * 
     * @memberOf X2JS
     */
    asDateTime(prop: string): Date;

    /**
     * Transformns an XML string into DOM-tree
     * 
     * @param {string} xml
     * @returns {Node}
     * 
     * @memberOf X2JS
     */
    xml2dom(xml: string): Document;


    /**
     * Transforms a DOM tree to JavaScript objects.
     * 
     * @template T
     * @param {Node} domNode
     * @returns {T}
     * 
     * @memberOf X2JS
     */
    dom2js<T>(domNode: Document): T;

    /**
     * 
     * 
     * @template T
     * @param {T} jsObject
     * @returns {Node}
     * 
     * @memberOf X2JS
     */
    js2dom<T>(jsObject: T): Document;

    /**
     * Transformns an XML string into JavaScript objects.
     * 
     * @template T
     * @param {string} xml
     * @returns {T}
     * 
     * @memberOf X2JS
     */
    xml2js<T>(xml: string): T;

    /**
     * Transforms JavaScript objects into an XML string.
     * 
     * @template T
     * @param {T} json
     * @returns {string}
     * 
     * @memberOf X2JS
     */
    js2xml<T>(json: T): string;

    /**
     * Gets the current version of x2js. 
     * 
     * @returns {string}
     * 
     * @memberOf X2JS
     */
    getVersion(): string;
}

declare namespace X2JS {
    export interface Options {
        /**
         * If set to "property" then <element>_asArray will be created to allow you to access any element as an array (even if there is only one of it).
         * 
         * @type {('property' | 'none')}
         * @memberOf X2JS.Options
         */
        arrayAccessForm?: 'property' | 'none';

        /**
         * If "text" then <empty></empty> will be transformed to "". If "object" then <empty></empty> will be transformed to {}.
         * 
         * @type {('object' | 'text')}
         * @memberOf X2JS.Options
         */
        emptyNodeForm?: 'object' | 'text';

        /**
         * If "object" then <empty></empty> will be transformed to {}.
         *
         * @type {'object'}
         * @memberOf X2JS.Options
         */
        xmldomOptions?: 'object';

        /**
         * Allows attribute values to be converted on the fly during parsing to objects.
         * 
         * @type {Array<X2JS.AttributeConverter>}
         * @memberOf X2JS.Options
         */
        attributeConverters?: Array<AttributeConverter>;

        /**
         * Any elements that match the paths here will have their text parsed as an XML datetime value (2011-11-12T13:00:00-07:00 style). The path can be a plain string (parent.child1.child2), a regex (/.*\.child2/) or function(elementPath).
         * 
         * @type {(Array<string | RegExp | ((elementPath: string) => boolean)>)}
         * @memberOf X2JS.Options
         */
        datetimeAccessFormPaths?: Array<string | RegExp | ((elementPath: string) => boolean)>;

        /**
         * Any elements that match the paths listed here will be stored in JavaScript objects as arrays even if there is only one of them. The path can be a plain string (parent.child1.child2), a regex (/.*\.child2/) or function(elementName, elementPath).
         * 
         * @type {(Array<string | RegExp | ((elementName: string, elementPath: string) => boolean)>)}
         * @memberOf X2JS.Options
         */
        arrayAccessFormPaths?: Array<string | RegExp | ((elementName: string, elementPath: string) => boolean)>;

        /**
         * If true, a toString function is generated to print nodes containing text or cdata. Useful if you want to accept both plain text and CData as equivalent inputs.
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        enableToStringFunc?: boolean;

        /**
         * If true, empty text tags are ignored for elements with child nodes.
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        skipEmptyTextNodesForObj?: boolean;

        /**
         * If true, whitespace is trimmed from text nodes.
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        stripWhitespaces?: boolean;

        /**
         * If true, double quotes are used in generated XML. 
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        useDoubleQuotes?: boolean;

        /**
         * If true, the root element of the XML document is ignored when converting to objects. The result will directly have the root element's children as its own properties.
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        ignoreRoot?: boolean;

        /**
         * Whether XML characters in text are escaped when reading/writing XML.
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        escapeMode?: boolean;

        /**
         * Prefix to use for properties that are created to represent XML attributes. 
         * 
         * @type {string}
         * @memberOf X2JS.Options
         */
        attributePrefix?: string;

        /**
         * If true, empty elements will created as self closing elements (<element />). If false, empty elements will be created with start and end tags (<element></element>).
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        selfClosingElements?: boolean;

        /**
         * If this property defined as false and an XML element has CData node ONLY, it will be converted to text without additional property "__cdata".
         * 
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        keepCData?: boolean;


        /**
         * If this property defined as true, use { __text: 'abc' } over 'abc'
         *
         * @type {boolean}
         * @memberOf X2JS.Options
         */
        keepText?: boolean;
    }

    export interface AttributeConverter {
        /**
         * Indicates whether an attribute should be converted.
         * 
         * @param {string} name
         * @param {*} value
         * @returns {boolean}
         * 
         * @memberOf X2JS.AttributeConverter
         */
        test(name: string, value: any): boolean;

        /**
         * Will be called for every attribute where test() returns true, replacing the original value of the attribute.
         * 
         * @param {string} name
         * @param {*} value
         * @returns {string}
         * 
         * @memberOf X2JS.AttributeConverter
         */
        convert(name: string, value: any): string;
    }
}

export = X2JS;
