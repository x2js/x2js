import X2JS, { X2JSConfig } from '../src/x2js';

/**
 * JS to XML test
 */
describe('Converting JavaScript objects to XML', () => {
  it('Element with attribute', () => {
    const js = {
      document: {
        element: {
          _attribute: 'value'
        }
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<element attribute="value" />' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Element with attribute and selfClosingElements set to false', () => {
    const js = {
      document: {
        element: {
          _attribute: 'value'
        }
      }
    };
    const x = new X2JS({
      selfClosingElements: false
    } as X2JSConfig);
    let xml = x.js2xml(js);

    let expected = '<document>' + '<element attribute="value"></element>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Element with attribute and selfClosingElements set to true', () => {
    const js = {
      document: {
        element: {
          _attribute: 'value'
        }
      }
    };
    const x = new X2JS({
      selfClosingElements: true
    } as X2JSConfig);
    const xml = x.js2xml(js);

    const expected = '<document>' + '<element attribute="value" />' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Element with attribute containing XML characters', () => {
    const js = {
      document: {
        element: {
          _attribute: 'va&lue<'
        }
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<element attribute="va&amp;lue&lt;" />' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Just a string', () => {
    const js = {
      document: {
        elementY: 'hello there'
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<elementY>hello there</elementY>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('String with XML characters', () => {
    const js = {
      document: {
        elementY: 'hello &there<'
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<elementY>hello &amp;there&lt;</elementY>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('CDATA', () => {
    const js = {
      document: {
        elementZ: { __cdata: 'hello again' }
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<elementZ><![CDATA[hello again]]></elementZ>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('CDATA with XML characters', () => {
    const js = {
      document: {
        elementZ: { __cdata: 'hello &again<' }
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected =
      '<document>' + '<elementZ><![CDATA[hello &again<]]></elementZ>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Empty string as value', () => {
    const js = {
      document: {
        elementU: ''
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<elementU />' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Zero as value', () => {
    const js = {
      document: {
        element: 0
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<element>0</element>' + '</document>';

    expect(xml).toEqual(expected);
  });

  it('Empty string as value with selfClosingElements set to false', () => {
    const js = {
      document: {
        elementU: ''
      }
    };
    const x = new X2JS({
      selfClosingElements: false
    } as X2JSConfig);

    const xml = x.js2xml(js);

    const expected = '<document>' + '<elementU></elementU>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Basic array', () => {
    const js = {
      document: {
        elementV: [{ x: 't' }, { m: 'n' }]
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected =
      '<document>' +
      '<elementV><x>t</x></elementV>' +
      '<elementV><m>n</m></elementV>' +
      '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Array of empty strings', () => {
    const js = {
      document: {
        elementX: ['', '']
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<document>' + '<elementX />' + '<elementX />' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Array of empty strings with selfClosingElements set to false', () => {
    const js = {
      document: {
        elementX: ['', '']
      }
    };
    const x = new X2JS({
      selfClosingElements: false
    } as X2JSConfig);
    const xml = x.js2xml(js);

    const expected =
      '<document>' + '<elementX></elementX>' + '<elementX></elementX>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Attributes in array', () => {
    const js = {
      document: {
        elementV: [
          {
            x: 't',
            _a: 'a'
          },
          {
            m: 'n',
            _b: 'b'
          }
        ]
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected =
      '<document>' +
      '<elementV a="a"><x>t</x></elementV>' +
      '<elementV b="b"><m>n</m></elementV>' +
      '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Namespaces', () => {
    const js = {
      document: {
        __prefix: 'ns',
        '_ns:xmlns': 'http://example.com',
        elementV: [
          {
            __prefix: 'ns',
            x: 't',
            _a: 'a'
          },
          {
            m: {
              __text: 'n',
              __prefix: 'ns'
            },
            _b: 'b'
          }
        ]
      }
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected =
      '<ns:document ns:xmlns="http://example.com">' +
      '<ns:elementV a="a"><x>t</x></ns:elementV>' +
      '<elementV b="b"><ns:m>n</ns:m></elementV>' +
      '</ns:document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Filter out', () => {
    const js = {
      document: {
        elementV: [{ x: 't' }, { password: 'n' }],
        password: 'n'
      }
    };
    const x = new X2JS({
      jsAttributeFilter: (name, value) => {
        return name === 'password';
      }
    } as X2JSConfig);
    const xml = x.js2xml(js);

    const expected =
      '<document>' + '<elementV><x>t</x></elementV>' + '<elementV></elementV>' + '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('Attribute converter', () => {
    const js = {
      document: {
        elementV: [{ x: 't' }, { password: 'n' }],
        password: 'n'
      }
    };
    const x = new X2JS({
      jsAttributeConverter: (name, value) => {
        return name === 'password' ? '***' : value;
      }
    } as X2JSConfig);
    const xml = x.js2xml(js);

    const expected =
      '<document>' +
      '<elementV><x>t</x></elementV>' +
      '<elementV><password>***</password></elementV>' +
      '<password>***</password>' +
      '</document>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('UTC dates', () => {
    const date = new Date();
    const js = {
      date: date
    };
    const x = new X2JS({
      jsDateUTC: true
    } as X2JSConfig);
    const xml = x.js2xml(js);

    const expected = '<date>' + date.toUTCString() + '</date>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });

  it('ISO dates', () => {
    const date = new Date();
    const js = {
      date: date
    };
    const x = new X2JS();
    const xml = x.js2xml(js);

    const expected = '<date>' + date.toISOString() + '</date>';

    // Implementation does not guarantee formatting so the test is somewhat fragile.
    expect(xml).toEqual(expected);
  });
});
