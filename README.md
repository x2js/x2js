# x2js

This is a library that converts between XML and JavaScript objects.
The conversion is not necessarily lossless but it is very convenient.

[![npm version](https://badge.fury.io/js/x2js.svg)](https://badge.fury.io/js/x2js)

master | development
------ | -----------
[![CI](https://github.com/x2js/x2js/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/x2js/x2js/actions/workflows/ci.yml) | [![CI](https://github.com/x2js/x2js/actions/workflows/ci.yml/badge.svg?branch=development)](https://github.com/x2js/x2js/actions/workflows/ci.yml)

# Integration

The code is all contained within the `x2js.js` file, so you can include it directly
via a script tag. It will create `window.X2JS`, which is a constructor that can be
used to create instances of the converter, providing an optional configuration object.

In a Node app, `require("x2js")` will give you the constructor that you can use the same way.

Loading via AMD-capable loaders (e.g. require.js) is also supported and works equivalently.

The `xmldom` package is a dependency but it is only used under Node, as in browsers the browser DOM is used.

# Quick start

```js
var x2js = new X2JS();
var document = x2js.xml2js(xml);

console.log(document.MyRootElement.ElementX[1].toString());

var xml = x2js.js2xml(document);
console.log(xml);
```

See the type definitions within `x2js.d.ts` for information about what configuration options you can pass.

# Automated tests

A set of test cases are part of the project and act as the primary usage examples.
They run under Node with [Vitest](https://vitest.dev/).

Run `npm test` to execute the tests and lint the code.

# Releases

Releases are fully automated with [semantic-release](https://semantic-release.gitbook.io/semantic-release/):
every push to `master` is analyzed, and if the commits since the last release warrant one
(per the [commit message format](#commit) below), a new version is computed, `CHANGELOG.md` is
updated, a Git tag and GitHub release are created, and the package is published to npm — no manual
version bump or `npm publish` needed.

# Contributing

Contributions are welcome! To ensure speedy merges, please:

* base any pull requests on the **development** branch.
* ensure that the code passes ESLint validation with the included ruleset.

## <a name="commit"></a> Commit Message Guidelines

We want to have a comitizen friendly formatted commit messages. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the change log**.

### Commit Message Format
The commit message must respect this format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system, CI configuration or external dependencies
            (example scopes: gulp, broccoli, npm)
* **ci**: Configuration files
* **chore**: Other changes that don't modify `src` or `test` files
* **revert**: Revert another commit
* **quiet**: Not documented in readme.md

### Scope
The scope could be anything specifying place of the commit change. For example
`DejaDatePicker`, `DejaMonacoEditor`, etc.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.
