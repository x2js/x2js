#### 3.4.0 (2019-11-26)

##### New Features

* **keepTextConfig:**  Add config to always generate text node with __text. ([88a3a2e7](https://github.com/Axinom/x2js/commit/88a3a2e7864db976bdd8ffddaabab51a169e175a))

##### Bug Fixes

* **parseXml:**  [#74](https://github.com/Axinom/x2js/pull/74) Fix old IE compatibility check ([a96daa14](https://github.com/Axinom/x2js/commit/a96daa1480c63604c0d9e1882c4b890f9ba0f0f7))

#### 3.3.1 (2019-07-15)

##### Bug Fixes

* **parseXml:**  [#74](https://github.com/Axinom/x2js/pull/74) Fix old IE compatibility check ([a96daa14](https://github.com/Axinom/x2js/commit/a96daa1480c63604c0d9e1882c4b890f9ba0f0f7))

#### 3.2.6 (2019-01-24)
#### 3.2.5 (2019-01-23)

##### New Features

* **config:**  [#80](https://github.com/Axinom/x2js/pull/80) Add minified dist ([4d7b1bdb](https://github.com/Axinom/x2js/commit/4d7b1bdb3eca938afa45ed454d45e7478f43ceea))

#### 3.2.3 (2018-11-06)

##### Continuous Integration

* **NPM:**  Public access for deploy ([63adc548](https://github.com/Axinom/x2js/commit/63adc548ecd51201b35f534fca6bd35d9a8b7ed1))
* **Travis:**
  *  Skip cleanup ([3d679cf9](https://github.com/Axinom/x2js/commit/3d679cf95033fc1fda806807b24570641b3771d8))
  *  Fix NPM login ([68d13a74](https://github.com/Axinom/x2js/commit/68d13a7433cdff80e8c4f179c03dd3354abdf5e5))
  *  NPM Deploy automatically ([fb197e59](https://github.com/Axinom/x2js/commit/fb197e59f68fa6902c868e8a6ef2c0d8d0ba44c3))
* **Package:**  Fix indent ([520e9d5d](https://github.com/Axinom/x2js/commit/520e9d5d84982477cfbb5866314fb9438f97cccd))

##### Bug Fixes

* **json2XML:**  deal with falsey __text values with attributes ([bd3997b4](https://github.com/Axinom/x2js/commit/bd3997b47ad72e3398fbaaabe5ad46ca393b745a))
* **xml2js:**  Attributes were lost when keepCData property was true [#73](https://github.com/Axinom/x2js/pull/73) ([c046e355](https://github.com/Axinom/x2js/commit/c046e35556e0531be2309ace7adc4cf0c0f35036))

### 3.2.2 (2018-05-17)

##### Bug Fixes

* **xml2js:** Attributes were lost when keepCData property was true #73 ([c046e35](https://github.com/x2js/x2js/commit/c046e35))

### 3.2.0 (2018-03-15)

##### Features

* Add parameter to convert dates to UTC instead of ISO (JS -> XML)
* Add parameter to filter out elements based upon a function (JS -> XML)
* Add parameter to convert elements before insertion (JS -> XML)