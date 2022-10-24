#### 3.4.4 (2022-10-24)

##### Chores

* **deps:**
  *  bump ajv and eslint ([17a7a6a8](https://github.com/x2js/x2js/commit/17a7a6a87dd8087b077dd529278bf15b099b3f8e))
  *  bump minimist from 1.2.5 to 1.2.7 ([af9d3447](https://github.com/x2js/x2js/commit/af9d3447ab5a5d43bc6003c61be6b28c25158235))
  *  bump @xmldom/xmldom from 0.7.4 to 0.8.3 ([85818b30](https://github.com/x2js/x2js/commit/85818b30a79e266c86a51bf690194d17b7db3660))
  *  bump follow-redirects from 1.13.3 to 1.14.8 ([ef1bfcb9](https://github.com/x2js/x2js/commit/ef1bfcb96d8caca78fd82c07bfeccc2629465e82))
* **deps-dev:**  bump karma from 6.2.0 to 6.3.16 ([ebfa25e7](https://github.com/x2js/x2js/commit/ebfa25e750ce741dc3f5aa41fc4066a16610d73a))

#### 3.4.3 (2022-01-14)

##### Chores

* **deps:**  bump engine.io from 4.1.1 to 4.1.2 ([10a0d1fb](https://github.com/x2js/x2js/commit/10a0d1fb67c9d788332879dd954a3529d812ea94))

##### Bug Fixes

* **X2JS:**  javadoc ([079a38d1](https://github.com/x2js/x2js/commit/079a38d1a212f3676cc93e9cb2612cd04f0d901f))

#### 3.4.2 (2021-09-06)

##### Chores

* **deps:**
  *  bump path-parse from 1.0.6 to 1.0.7 ([ed25a3dd](https://github.com/x2js/x2js/commit/ed25a3dd0d7820ca27755f8966dbcbcbada26b1b))
  *  bump ws from 7.4.4 to 7.4.6 ([909b4582](https://github.com/x2js/x2js/commit/909b4582c6052647c9d01e4bbf9a34b49205316b))

#### 3.4.1 (2021-03-18)

##### Continuous Integration

* **dependencies:**  Fix npm audit ([c6d9739f](https://github.com/x2js/x2js/commit/c6d9739f226db2895fd657a7a06424761fde8f2f))

##### Documentation Changes

* **licensing:**  [#89](https://github.com/x2js/x2js/pull/89) - Add license file ([72168aad](https://github.com/x2js/x2js/commit/72168aadd5882763b5f954e879f6ce86fc86149e))

#### 3.4.0 (2019-11-26)

##### New Features

* **keepTextConfig:**  Add config to always generate text node with __text. ([88a3a2e7](https://github.com/x2js/x2js/commit/88a3a2e7864db976bdd8ffddaabab51a169e175a))

##### Bug Fixes

* **parseXml:**  [#74](https://github.com/x2js/x2js/pull/74) Fix old IE compatibility check ([a96daa14](https://github.com/x2js/x2js/commit/a96daa1480c63604c0d9e1882c4b890f9ba0f0f7))

#### 3.3.1 (2019-07-15)

##### Bug Fixes

* **parseXml:**  [#74](https://github.com/x2js/x2js/pull/74) Fix old IE compatibility check ([a96daa14](https://github.com/x2js/x2js/commit/a96daa1480c63604c0d9e1882c4b890f9ba0f0f7))

#### 3.2.6 (2019-01-24)
#### 3.2.5 (2019-01-23)

##### New Features

* **config:**  [#80](https://github.com/x2js/x2js/pull/80) Add minified dist ([4d7b1bdb](https://github.com/x2js/x2js/commit/4d7b1bdb3eca938afa45ed454d45e7478f43ceea))

#### 3.2.3 (2018-11-06)

##### Continuous Integration

* **NPM:**  Public access for deploy ([63adc548](https://github.com/x2js/x2js/commit/63adc548ecd51201b35f534fca6bd35d9a8b7ed1))
* **Travis:**
  *  Skip cleanup ([3d679cf9](https://github.com/x2js/x2js/commit/3d679cf95033fc1fda806807b24570641b3771d8))
  *  Fix NPM login ([68d13a74](https://github.com/x2js/x2js/commit/68d13a7433cdff80e8c4f179c03dd3354abdf5e5))
  *  NPM Deploy automatically ([fb197e59](https://github.com/x2js/x2js/commit/fb197e59f68fa6902c868e8a6ef2c0d8d0ba44c3))
* **Package:**  Fix indent ([520e9d5d](https://github.com/x2js/x2js/commit/520e9d5d84982477cfbb5866314fb9438f97cccd))

##### Bug Fixes

* **json2XML:**  deal with falsey __text values with attributes ([bd3997b4](https://github.com/x2js/x2js/commit/bd3997b47ad72e3398fbaaabe5ad46ca393b745a))
* **xml2js:**  Attributes were lost when keepCData property was true [#73](https://github.com/x2js/x2js/pull/73) ([c046e355](https://github.com/x2js/x2js/commit/c046e35556e0531be2309ace7adc4cf0c0f35036))

### 3.2.2 (2018-05-17)

##### Bug Fixes

* **xml2js:** Attributes were lost when keepCData property was true #73 ([c046e35](https://github.com/x2js/x2js/commit/c046e35))

### 3.2.0 (2018-03-15)

##### Features

* Add parameter to convert dates to UTC instead of ISO (JS -> XML)
* Add parameter to filter out elements based upon a function (JS -> XML)
* Add parameter to convert elements before insertion (JS -> XML)