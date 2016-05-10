(function (root, factory) {
	'use strict';

    if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but only CommonJS-like
		// environments that support module.exports, like Node.
        factory(require('./x2js'), require('qunit-cli'));
    } else {
        // Browser globals (root is window)
        factory(root.X2JS, root.QUnit);
	}
})(this, function (X2JS, QUnit) {
	'use strict';

	QUnit.module('Converting JavaScript objects to XML');

	QUnit.test('Element with attribute', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Element with attribute and selfClosingElements set to false', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Element with attribute containing XML characters', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Just a string', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('String with XML characters', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('CDATA', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('CDATA with XML characters', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Empty string as value', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Empty string as value with selfClosingElements set to false', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Basic array', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Array of empty strings', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Array of empty strings with selfClosingElements set to false', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Attributes in array', function (assert) {
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
		assert.strictEqual(xml, expected);
	});

	QUnit.test('Namespaces', function (assert) {
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
		assert.strictEqual(xml, expected);
	});
});
