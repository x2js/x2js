/* global X2JS */

(function () {
	'use strict';

	QUnit.module('Smoke tests');

	QUnit.test('X->JS single element', function (assert) {
		var xml = '<document><element>text</element></document>';
		var x = new X2JS();

		var js = x.xml_str2json(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.strictEqual(js.document.element, 'text');
	});

	QUnit.test('X->JS two elements', function (assert) {
		var xml = '<document><element1>text</element1><element2>text2</element2></document>';
		var x = new X2JS();

		var js = x.xml_str2json(xml);

		assert.ok(js.document);
		assert.ok(js.document.element1);
		assert.strictEqual(js.document.element1, 'text');
		assert.ok(js.document.element2);
		assert.strictEqual(js.document.element2, 'text2');
	});

	QUnit.module('Configuration options');

	QUnit.test('Default attribute prefix', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS();
		var js = x.xml_str2json(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element._attribute);
		assert.strictEqual('value', js.document.element._attribute);
	});

	QUnit.test('Empty attribute prefix', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'attributePrefix': ''
		});
		var js = x.xml_str2json(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element.attribute);
		assert.strictEqual('value', js.document.element.attribute);
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
		var js = x.xml_str2json(xml);

		assert.ok(js.Root);
		assert.ok(js.Root.element);
		assert.ok(js.Root.element.length);
		assert.ok(js.Root.element[0]);
		assert.ok(js.Root.element[0]._test1);
		assert.ok(js.Root.element[0]._test2);
		assert.strictEqual('success 1.*', js.Root.element[0]._test1);
		assert.strictEqual('success 2.1', js.Root.element[0]._test2);
		assert.strictEqual('success 1.*', js.Root.element[1]._test1);
		assert.strictEqual('success 2.2', js.Root.element[1]._test2);
	});

	QUnit.test('Root element is dropped with ignoreRoot=true', function (assert) {
		var xml = '<document><element attribute="value" /></document>';
		var x = new X2JS({
			'ignoreRoot': true
		});
		var js = x.xml_str2json(xml);

		assert.notOk(js.document);
		assert.ok(js.element);
	});
})();