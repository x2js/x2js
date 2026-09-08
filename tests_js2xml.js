/* eslint-disable strict -- standalone CJS test entry file, no concatenation risk */
'use strict';

/* global describe, it, expect */
const X2JS = require('./x2js');

describe('Converting JavaScript objects to XML', () => {
	it('Element with attribute', () => {
		var js = {
			'document': {
				'element': {
					'_attribute': 'value'
				}
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<element attribute="value" />' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Element with attribute and selfClosingElements set to false', () => {
		var js = {
			'document': {
				'element': {
					'_attribute': 'value'
				}
			}
		};
		var x = new X2JS({
			'selfClosingElements': false
		});
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<element attribute="value"></element>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Element with attribute and selfClosingElements set to true', () => {
		var js = {
			'document': {
				'element': {
					'_attribute': 'value'
				}
			}
		};
		var x = new X2JS({
			'selfClosingElements': true
		});
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<element attribute="value" />' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Element with attribute containing XML characters', () => {
		var js = {
			'document': {
				'element': {
					'_attribute': 'va&lue<'
				}
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<element attribute="va&amp;lue&lt;" />' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Just a string', () => {
		var js = {
			'document': {
				'elementY': 'hello there'
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementY>hello there</elementY>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('String with XML characters', () => {
		var js = {
			'document': {
				'elementY': 'hello &there<'
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementY>hello &amp;there&lt;</elementY>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('CDATA', () => {
		var js = {
			'document': {
				'elementZ': { '__cdata': 'hello again' }
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementZ><![CDATA[hello again]]></elementZ>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('CDATA with XML characters', () => {
		var js = {
			'document': {
				'elementZ': { '__cdata': 'hello &again<' }
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementZ><![CDATA[hello &again<]]></elementZ>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Empty string as value', () => {
		var js = {
			'document': {
				'elementU': ''
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementU />' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Zero as value', () => {
		var js = {
			'document': {
				'element': 0
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<element>0</element>' +
			'</document>';

		expect(xml).toBe(expected);
	});

	it('Empty string as value with selfClosingElements set to false', () => {
		var js = {
			'document': {
				'elementU': ''
			}
		};
		var x = new X2JS({
			'selfClosingElements': false
		});

		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementU></elementU>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Basic array', () => {
		var js = {
			'document': {
				'elementV': [
					{ 'x': 't' },
					{ 'm': 'n' }
				]
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementV><x>t</x></elementV>' +
			'<elementV><m>n</m></elementV>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Array of empty strings', () => {
		var js = {
			'document': {
				'elementX': ['', '']
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementX />' +
			'<elementX />' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Array of empty strings with selfClosingElements set to false', () => {
		var js = {
			'document': {
				'elementX': ['', '']
			}
		};
		var x = new X2JS({
			'selfClosingElements': false
		});
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementX></elementX>' +
			'<elementX></elementX>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Attributes in array', () => {
		var js = {
			'document': {
				'elementV': [
					{
						'x': 't',
						'_a': 'a'
					},
					{
						'm': 'n',
						'_b': 'b'
					}
				]
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementV a="a"><x>t</x></elementV>' +
			'<elementV b="b"><m>n</m></elementV>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Falsey element values + attributes', () => {
		var js = {
			'document': {
				'elementV': [
					{
						'm': {
							'__text': 'n',
							'_a': 'ns'
						}
					},
					{
						'm': {
							'__text': 0,
							'_a': 'ns'
						}
					},
					{
						'm': {
							'__text': false,
							'_a': 'ns'
						}
					}
				]
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementV><m a="ns">n</m></elementV>' +
			'<elementV><m a="ns">0</m></elementV>' +
			'<elementV><m a="ns">false</m></elementV>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Namespaces', () => {
		var js = {
			'document': {
				'__prefix': 'ns',
				'_ns:xmlns': 'http://example.com',
				'elementV': [
					{
						'__prefix': 'ns',
						'x': 't',
						'_a': 'a'
					},
					{
						'm': {
							'__text': 'n',
							'__prefix': 'ns'
						},
						'_b': 'b'
					}
				]
			}
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<ns:document ns:xmlns="http://example.com">' +
			'<ns:elementV a="a"><x>t</x></ns:elementV>' +
			'<elementV b="b"><ns:m>n</ns:m></elementV>' +
			'</ns:document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Filter out', () => {
		var js = {
			'document': {
				'elementV': [
					{ 'x': 't' },
					{ 'password': 'n' }
				],
				'password': 'n'
			}
		};
		var x = new X2JS({
			'jsAttributeFilter': function (name, value) {
				return name === 'password';
			}
		});
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementV><x>t</x></elementV>' +
			'<elementV></elementV>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('Attribute converter', () => {
		var js = {
			'document': {
				'elementV': [
					{ 'x': 't' },
					{ 'password': 'n' }
				],
				'password': 'n'
			}
		};
		var x = new X2JS({
			'jsAttributeConverter': function (name, value) {
				return name === 'password' ? '***' : value;
			}
		});
		var xml = x.js2xml(js);

		var expected = '<document>' +
			'<elementV><x>t</x></elementV>' +
			'<elementV><password>***</password></elementV>' +
			'<password>***</password>' +
			'</document>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('UTC dates', () => {
		var date = new Date();
		var js = {
			'date': date
		};
		var x = new X2JS({
			'jsDateUTC': true
		});
		var xml = x.js2xml(js);

		var expected = '<date>' +
			date.toUTCString() +
			'</date>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});

	it('ISO dates', () => {
		var date = new Date();
		var js = {
			'date': date
		};
		var x = new X2JS();
		var xml = x.js2xml(js);

		var expected = '<date>' +
			date.toISOString() +
			'</date>';

		// Implementation does not guarantee formatting so the test is somewhat fragile.
		expect(xml).toBe(expected);
	});
});

