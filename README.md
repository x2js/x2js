# x2js
Axinom maintained fork of the x2js library

This is a library that converts between XML and JavaScript objects.
The conversion is not necessarily lossless but it is very convenient.

A set of QUnit test cases are part of the project and also act as the
primary documentation, aside from the code comments in x2js.js itself.

Use Karma to run the test cases (karma start --single-run).

# Running tests
Run `karma start --single run` to test with Chrome, Firefox and IE.
Do not use `npm test` as that is reserved for the CI test entry point.

Travis CI uses `npm test` to run tests using Firefox via Karma.