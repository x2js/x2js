# x2js

This is a library that converts between XML and JavaScript objects.
The conversion is not necessarily lossless but it is very convenient.

master | development
------ | -----------
[![Build Status](https://travis-ci.org/Axinom/x2js.svg?branch=master)](https://travis-ci.org/Axinom/x2js) | [![Build Status](https://travis-ci.org/Axinom/x2js.svg?branch=development)](https://travis-ci.org/Axinom/x2js)

# Integration

The code is all contained within the `x2js.js` file, so you can include it directly
via a script tag. It will create `window.X2JS`, which is a constructor that can be
used to create instances of the converter, providing an optional configuration object.

In a Node app, `require("x2js")` will give you the constructor that you can use the same way.
**NB!** You must manually install the `xmldom` package, as it is not marked as a dependency since
it is not needed if you do not plan to use the library as part of a Node application.

Loading via AMD-capable loaders (e.g. require.js) is also supported and works equivalently.

# Quick start

	var x2js = new X2JS();
	var document = x2js.xml2js(xml);

	console.log(document.MyRootElement.ElementX[1].toString());

	var xml = x2js.js2xml(document);
	console.log(xml);

See the code within `x2js.js` for information about what configuration options you can pass.
Exported functions are listed at the end of the file - there are only a few of them.

# Automated tests

A set of QUnit test cases are part of the project and act as the primary usage examples.

Run `karma start --single run` to test with Chrome, Firefox and IE.
Run `node_modules\.bin\qunit-cli all_tests.js` to test with the Node runtime.
Run `npm test` to execute both sets of tests.

Travis CI uses `npm travistest` to run tests using Firefox via Karma and Node.