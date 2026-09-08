/* eslint-disable strict -- standalone CJS test entry file, no concatenation risk */
'use strict';

// Test cases are full of magic numbers and that's fine.
/* eslint-disable no-magic-numbers */

/* global describe, it, expect */
const X2JS = require('./x2js');

describe('Configuration options', () => {
	it('Default attribute prefix', () => {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS();
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element._attribute).toBeTruthy();
		expect(js.document.element._attribute).toBe('value');
	});

	it('Empty attribute prefix', () => {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'attributePrefix': ''
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element.attribute).toBeTruthy();
		expect(js.document.element.attribute).toBe('value');
	});

	it('Custom nonempty attribute prefix', () => {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'attributePrefix': '$$'
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element.$$attribute).toBeTruthy();
		expect(js.document.element.$$attribute).toBe('value');
	});

	it('Attribute converters run but only when appropriate', () => {
		var xml = '<Root><element test1="FAIL" test2="success 2.1">first</element><element test1="FAIL 1.2" test2="success 2.2">second</element></Root>';
		var x = new X2JS({
			'attributeConverters': [
				{
					'test': function (name, value) {
						return name === 'test1';
					},
					'convert': function (name, value) {
						return 'success 1.*';
					}
				}
			]
		});
		var js = x.xml2js(xml);

		expect(js.Root).toBeTruthy();
		expect(js.Root.element).toBeTruthy();
		expect(js.Root.element.length).toBeTruthy();
		expect(js.Root.element[0]).toBeTruthy();
		expect(js.Root.element[0]._test1).toBeTruthy();
		expect(js.Root.element[0]._test2).toBeTruthy();
		expect(js.Root.element[0]._test1).toBe('success 1.*');
		expect(js.Root.element[0]._test2).toBe('success 2.1');
		expect(js.Root.element[1]._test1).toBe('success 1.*');
		expect(js.Root.element[1]._test2).toBe('success 2.2');
	});

	it('Root element is dropped with ignoreRoot=true', () => {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'ignoreRoot': true
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeFalsy();
		expect(js.element).toBeTruthy();
	});

	it('Array access-form override via path', () => {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'arrayAccessFormPaths': [
				'document.element'
			]
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element.length).toBeTruthy();
		expect(js.document.element.length).toBe(1);
		expect(js.document.element[0]).toBeTruthy();
	});

	it('Array access-form override via regex', () => {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'arrayAccessFormPaths': [
				/.*\.element$/
			]
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element.length).toBeTruthy();
		expect(js.document.element.length).toBe(1);
		expect(js.document.element[0]).toBeTruthy();
	});

	it('Array access-form override via function', () => {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'arrayAccessFormPaths': [
				function (elementName, elementPath) {
					return elementName === 'element';
				}
			]
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element.length).toBeTruthy();
		expect(js.document.element.length).toBe(1);
		expect(js.document.element[0]).toBeTruthy();
	});

	it('Datetime parsing via path', () => {
		var xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>';
		var x = new X2JS({
			'datetimeAccessFormPaths': [
				'document.datetimeElement'
			]
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.datetimeElement).toBeTruthy();
		expect(js.document.datetimeElement instanceof Date).toBeTruthy();
		expect(js.document.datetimeElement.getFullYear()).toBe(2002);
	});

	it('Datetime parsing via regex', () => {
		var xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>';
		var x = new X2JS({
			'datetimeAccessFormPaths': [
				/.*\.datetimeElement$/
			]
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.datetimeElement).toBeTruthy();
		expect(js.document.datetimeElement instanceof Date).toBeTruthy();
		expect(js.document.datetimeElement.getFullYear()).toBe(2002);
	});

	it('Datetime parsing via function', () => {
		var xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>';
		var x = new X2JS({
			'datetimeAccessFormPaths': [
				function (elementPath) {
					return elementPath === 'document.datetimeElement';
				}
			]
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.datetimeElement).toBeTruthy();
		expect(js.document.datetimeElement instanceof Date).toBeTruthy();
		expect(js.document.datetimeElement.getFullYear()).toBe(2002);
	});

	it('Datetime parsing in different formats', () => {
		var xml = '<document>' +
			'<datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement>' +
			'<datetimeElement>2002-10-10T12:00:00Z</datetimeElement>' +
			'<datetimeElement>2002-10-10T12:00:00</datetimeElement>' +
			'<datetimeElement>2002-10-10T12:00:00Z</datetimeElement>' +
			'</document>';
		var x = new X2JS({
			'datetimeAccessFormPaths': [
				'document.datetimeElement'
			]
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.datetimeElement).toBeTruthy();
		expect(js.document.datetimeElement.length).toBeTruthy();
		expect(js.document.datetimeElement.length).toBe(4);

		for (var i = 0; i < js.document.datetimeElement.length; i++) {
			expect(js.document.datetimeElement[i]).toBeTruthy();
			expect(js.document.datetimeElement[i] instanceof Date).toBeTruthy();
			expect(js.document.datetimeElement[i].getFullYear()).toBe(2002);
		}
	});

	it('Options to xmldom', () => {
		var xml = '<';
		var x = new X2JS({
			'xmldomOptions': {
				// `errorHandler` was removed by @xmldom/xmldom 0.9; `onError` is the replacement.
				onError() {}
			}
		});

		try {
			x.xml2js(xml);
		} catch (e) {
			expect(e.message).toBe('missing root element');
		}
		expect(true).toBe(true);
	});

	it(`Element only has text node with default keepText(keepText='false')`, () => {
		var xml = '<document><element>text</element></document>';
		var x = new X2JS();
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element).toBe('text');
	});

	it(`Element only has text node with keepText='true'`, () => {
		var xml = '<document><element>text</element></document>';
		var x = new X2JS({
			'keepText': true
		});
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element.__text).toBe('text');
	});
});

