/* eslint-disable strict -- standalone CJS test entry file, no concatenation risk */
'use strict';

/* global describe, it, expect */
const X2JS = require('./x2js');

describe('Smoke tests', () => {
	it('X->JS single element', () => {
		var xml = '<document><element>text</element></document>';
		var x = new X2JS();

		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element).toBeTruthy();
		expect(js.document.element).toBe('text');
	});

	it('X->JS two elements', () => {
		var xml = '<document><element1>text</element1><element2>text2</element2></document>';
		var x = new X2JS();

		var js = x.xml2js(xml);

		expect(js.document).toBeTruthy();
		expect(js.document.element1).toBeTruthy();
		expect(js.document.element1).toBe('text');
		expect(js.document.element2).toBeTruthy();
		expect(js.document.element2).toBe('text2');
	});
});
