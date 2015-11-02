# x2js

This is a library that converts between XML and JavaScript objects.
The conversion is not necessarily lossless but it is very convenient.

# Build status

master | development
------ | -----------
[![Build Status](https://travis-ci.org/Axinom/x2js.svg)](https://travis-ci.org/Axinom/x2js) | [![Build Status](https://travis-ci.org/Axinom/x2js.svg?branch=development)](https://travis-ci.org/Axinom/x2js)

# Automated tests

A set of QUnit test cases are part of the project and also act as the
primary documentation, aside from the code comments in x2js.js itself.

Run `karma start --single run` to test with Chrome, Firefox and IE.
Do not use `npm test` as that is reserved for the CI test entry point.

Travis CI uses `npm test` to run tests using Firefox via Karma.