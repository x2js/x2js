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

	// Test cases are full of magic numbers and that's fine.
	/* eslint-disable no-magic-numbers */

	QUnit.module('Configuration options');

	QUnit.test('Default attribute prefix', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS();
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element._attribute);
		assert.strictEqual(js.document.element._attribute, 'value');
	});

	QUnit.test('Empty attribute prefix', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'attributePrefix': ''
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element.attribute);
		assert.strictEqual(js.document.element.attribute, 'value');
	});

	QUnit.test('Custom nonempty attribute prefix', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'attributePrefix': '$$'
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element.$$attribute);
		assert.strictEqual(js.document.element.$$attribute, 'value');
	});

	QUnit.test('Attribute converters run but only when appropriate', function (assert) {
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

		assert.ok(js.Root);
		assert.ok(js.Root.element);
		assert.ok(js.Root.element.length);
		assert.ok(js.Root.element[0]);
		assert.ok(js.Root.element[0]._test1);
		assert.ok(js.Root.element[0]._test2);
		assert.strictEqual(js.Root.element[0]._test1, 'success 1.*');
		assert.strictEqual(js.Root.element[0]._test2, 'success 2.1');
		assert.strictEqual(js.Root.element[1]._test1, 'success 1.*');
		assert.strictEqual(js.Root.element[1]._test2, 'success 2.2');
	});

	QUnit.test('Root element is dropped with ignoreRoot=true', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'ignoreRoot': true
		});
		var js = x.xml2js(xml);

		assert.notOk(js.document);
		assert.ok(js.element);
	});

	QUnit.test('Array access-form override via path', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'arrayAccessFormPaths': [
				'document.element'
			]
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element.length);
		assert.strictEqual(js.document.element.length, 1);
		assert.ok(js.document.element[0], 'value');
	});

	QUnit.test('Array access-form override via regex', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'arrayAccessFormPaths': [
				/.*\.element$/
			]
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element.length);
		assert.strictEqual(js.document.element.length, 1);
		assert.ok(js.document.element[0], 'value');
	});

	QUnit.test('Array access-form override via function', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'arrayAccessFormPaths': [
				function (elementName, elementPath) {
					return elementName === 'element';
				}
			]
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element.length);
		assert.strictEqual(js.document.element.length, 1);
		assert.ok(js.document.element[0], 'value');
	});

	QUnit.test('Datetime parsing via path', function (assert) {
		var xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>';
		var x = new X2JS({
			'datetimeAccessFormPaths': [
				'document.datetimeElement'
			]
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.datetimeElement);
		assert.ok(js.document.datetimeElement instanceof Date);
		assert.strictEqual(js.document.datetimeElement.getFullYear(), 2002);
	});

	QUnit.test('Datetime parsing via regex', function (assert) {
		var xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>';
		var x = new X2JS({
			'datetimeAccessFormPaths': [
				/.*\.datetimeElement$/
			]
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.datetimeElement);
		assert.ok(js.document.datetimeElement instanceof Date);
		assert.strictEqual(js.document.datetimeElement.getFullYear(), 2002);
	});

	QUnit.test('Datetime parsing via function', function (assert) {
		var xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>';
		var x = new X2JS({
			'datetimeAccessFormPaths': [
				function (elementPath) {
					return elementPath === 'document.datetimeElement';
				}
			]
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.datetimeElement);
		assert.ok(js.document.datetimeElement instanceof Date);
		assert.strictEqual(js.document.datetimeElement.getFullYear(), 2002);
	});

	QUnit.test('Datetime parsing in different formats', function (assert) {
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

		assert.ok(js.document);
		assert.ok(js.document.datetimeElement);
		assert.ok(js.document.datetimeElement.length);
		assert.strictEqual(js.document.datetimeElement.length, 4);

		for (var i = 0; i < js.document.datetimeElement.length; i++) {
			assert.ok(js.document.datetimeElement[i]);
			assert.ok(js.document.datetimeElement[i] instanceof Date);
			assert.strictEqual(js.document.datetimeElement[i].getFullYear(), 2002);
		}
	});

	QUnit.test('Options to xmldom', function (assert) {
		var xml = '<';
		var x = new X2JS({
			'xmldomOptions': {
				'errorHandler': {
					error(error) {
						throw error;
					}
				}
			}
		});

		try {
			x.xml2js(xml);
		} catch (e) {
			assert.equal(e, '[xmldom error]\telement parse error: [xmldom error]\tunexpected end of input\n' +
				'@#[line:undefined,col:undefined]\n' +
				'@#[line:undefined,col:undefined]');
		}
		assert.ok(true);
	});

	QUnit.test(`Element only has text node with default keepText(keepText='false')`, function (assert) {
		var xml = '<document><element>text</element></document>';
		var x = new X2JS();
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.strictEqual(js.document.element, 'text');
	});

	QUnit.test(`Element only has text node with keepText='true'`, function (assert) {
		var xml = '<document><element>text</element></document>';
		var x = new X2JS({
			'keepText': true
		});
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.strictEqual(js.document.element.__text, 'text');
	});
});
