/* global X2JS */

(function () {
	'use strict';

	QUnit.module('Smoke tests');

	QUnit.test('X->JS single element', function (assert) {
		var xml = '<document><element>text</element></document>';
		var x = new X2JS();

		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.strictEqual(js.document.element, 'text');
	});

	QUnit.test('X->JS two elements', function (assert) {
		var xml = '<document><element1>text</element1><element2>text2</element2></document>';
		var x = new X2JS();

		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element1);
		assert.strictEqual(js.document.element1, 'text');
		assert.ok(js.document.element2);
		assert.strictEqual(js.document.element2, 'text2');
	});
})();