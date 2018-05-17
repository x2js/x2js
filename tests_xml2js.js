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

	QUnit.module('Converting XML to JavaScript objects');

	QUnit.test('Basic XML', function (assert) {
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

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.ok(js.document.element._attribute);
		assert.strictEqual(js.document.element._attribute, 'value');

		assert.ok(js.document.elementX);
		assert.ok(js.document.elementX.length);
		assert.strictEqual(js.document.elementX.length, 2);
		assert.strictEqual(js.document.elementX[0], '');
		assert.strictEqual(js.document.elementX[1], '');

		assert.ok(js.document.elementY);
		assert.strictEqual(js.document.elementY.toString(), 'hello there');
		assert.strictEqual(js.document.elementY, 'hello there');

		assert.ok(js.document.elementZ);
		assert.strictEqual(js.document.elementZ.toString(), 'hello again');
		assert.strictEqual(js.document.elementZ, 'hello again');

		assert.ok(js.document.elementZA);
		assert.strictEqual(js.document.elementZA.toString(), 'Test hello again');
		assert.strictEqual(js.document.elementZA.__cdata, ' hello again');

		assert.ok(js.document.elementZB);
		assert.strictEqual(js.document.elementZB.toString(), 'hello again');
		assert.strictEqual(js.document.elementZB._attribute, 'value');
		assert.strictEqual(js.document.elementZB.__cdata, 'hello again');
	});

	QUnit.test('XML with namespace prefixes', function (assert) {
		var xml = '<ns:root xmlns:ns="http://example.com" xmlns:ns2="http://example.com(2)">' +
			'<nonamespace>' +
			'<ns2:el ns:attribute="yes" />' +
			'</nonamespace>' +
			'</ns:root>';

		var x = new X2JS();
		var js = x.xml2js(xml);

		// We don't understand namespaces but we do remember the prefixes.
		assert.ok(js);
		assert.ok(js.root);
		assert.strictEqual(js.root.__prefix, 'ns');
		assert.ok(js.root.nonamespace);
		assert.ok(js.root.nonamespace.el);
		assert.strictEqual(js.root.nonamespace.el.__prefix, 'ns2');

		// Except for attributes, which we don't acknowledge can even use namespaces.
		// Perhaps not the most convenient but whatever, not an important feature.
		assert.ok(js.root.nonamespace.el['_ns:attribute']);
	});

	QUnit.test('XML with declaration', function (assert) {
		var xml = '<?xml version="1.0" encoding="utf-8" ?>\n' +
			'<document>' +
			'<element>great success</element>' +
			'</document>';
		var x = new X2JS();
		var js = x.xml2js(xml);

		assert.ok(js.document);
		assert.ok(js.document.element);
		assert.strictEqual(js.document.element, 'great success');
	});

	QUnit.test('Passing non-string to xml2js returns null', function (assert) {
		var x = new X2JS();

		assert.propEqual(x.xml2js({ "wololo": "rogan" }), null);
		assert.propEqual(x.xml2js(99), null);
		assert.propEqual(x.xml2js(undefined), null);
	});
});