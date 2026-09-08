/* eslint-disable strict -- standalone CJS test entry file, no concatenation risk */
'use strict';

// Test cases are full of magic numbers and that's fine.
/* eslint-disable no-magic-numbers */

/* global describe, it, expect */
const X2JS = require('./x2js');

describe('Converting XML to JavaScript objects', () => {
	it('Basic XML', () => {
		var xml = '<document>' +
			'<element attribute="value" />' +
			'<elementX />' +
			'<elementX />' +
			'<elementY>hello there</elementY>' +
			'<elementZ><![CDATA[hello again]]></elementZ>' +
			'<elementZA>Test<![CDATA[ hello again]]></elementZA>' +
			'<elementZB attribute="value"><![CDATA[hello again]]></elementZB>' +
			'</document>';
		var x = new X2JS();
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element._attribute).toBeTruthy();
		expect(js.document.element._attribute).toBe('value');

		expect(js.document.elementX).toBeTruthy();
		expect(js.document.elementX.length).toBeTruthy();
		expect(js.document.elementX.length).toBe(2);
		expect(js.document.elementX[0]).toBe('');
		expect(js.document.elementX[1]).toBe('');

		expect(js.document.elementY).toBeTruthy();
		expect(js.document.elementY.toString()).toBe('hello there');
		expect(js.document.elementY).toBe('hello there');

		expect(js.document.elementZ).toBeTruthy();
		expect(js.document.elementZ.toString()).toBe('hello again');
		expect(js.document.elementZ).toBe('hello again');

		expect(js.document.elementZA).toBeTruthy();
		expect(js.document.elementZA.toString()).toBe('Test hello again');
		expect(js.document.elementZA.__cdata).toBe(' hello again');

		expect(js.document.elementZB).toBeTruthy();
		expect(js.document.elementZB.toString()).toBe('hello again');
		expect(js.document.elementZB._attribute).toBe('value');
		expect(js.document.elementZB.__cdata).toBe('hello again');
	});

	it('XML with namespace prefixes', () => {
		var xml = '<ns:root xmlns:ns="http://example.com" xmlns:ns2="http://example.com(2)">' +
			'<nonamespace>' +
			'<ns2:el ns:attribute="yes" />' +
			'</nonamespace>' +
			'</ns:root>';

		var x = new X2JS();
		var js = x.xml2js(xml);

		// We don't understand namespaces but we do remember the prefixes.
		expect(js).toBeTruthy();
		expect(js.root).toBeTruthy();
		expect(js.root.__prefix).toBe('ns');
		expect(js.root.nonamespace).toBeTruthy();
		expect(js.root.nonamespace.el).toBeTruthy();
		expect(js.root.nonamespace.el.__prefix).toBe('ns2');

		// Except for attributes, which we don't acknowledge can even use namespaces.
		// Perhaps not the most convenient but whatever, not an important feature.
		expect(js.root.nonamespace.el['_ns:attribute']).toBeTruthy();
	});

	it('XML with declaration', () => {
		var xml = '<?xml version="1.0" encoding="utf-8" ?>\n' +
			'<document>' +
			'<element>great success</element>' +
			'</document>';
		var x = new X2JS();
		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element).toBe('great success');
	});

	it('Passing non-string to xml2js returns null', () => {
		var x = new X2JS();

		expect(x.xml2js({ "wololo": "rogan" })).toEqual(null);
		expect(x.xml2js(99)).toEqual(null);
		expect(x.xml2js(undefined)).toEqual(null);
	});
});
