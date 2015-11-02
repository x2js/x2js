/* global X2JS */

(function () {
	'use strict';

	QUnit.module('Funky tests');

	QUnit.test('asArray() converts to array', function (assert) {
		var x = new X2JS();

		// It preserves existing arrays.
		assert.propEqual(x.asArray([1, 2, 3]), [1, 2, 3]);

		// And converts anything else.
		assert.propEqual(x.asArray('stringvalue'), ['stringvalue']);
		assert.propEqual(x.asArray({}), [{}]);
		assert.propEqual(x.asArray(''), ['']);

		// Except some things, which are turned into empty arrays just because.
		assert.propEqual(x.asArray(null), []);
		assert.propEqual(x.asArray(undefined), []);
	});
})();