import X2JS from '../src/x2js';

/**
 * XML to JS test
 */
describe('Converting XML to JavaScript objects', () => {
  it('Basic XML', () => {
    const xml =
      '<document>' +
      '<element attribute="value" />' +
      '<elementX />' +
      '<elementX />' +
      '<elementY>hello there</elementY>' +
      '<elementZ><![CDATA[hello again]]></elementZ>' +
      '<elementZA>Test<![CDATA[ hello again]]></elementZA>' +
      '<elementZB attribute="value"><![CDATA[hello again]]></elementZB>' +
      '</document>';

    const x2js = new X2JS();
    const js = x2js.xml2js(xml);

    expect(js.document).toBeDefined();
    expect(js.document.element).toBeDefined();
    expect(js.document.element._attribute).toBeDefined();

    expect(js.document.element._attribute).toEqual('value');

    expect(js.document.elementX).toBeDefined();
    expect(js.document.elementX.length).toBeDefined();
    expect(js.document.elementX.length).toEqual(2);
    expect(js.document.elementX[0]).toEqual('');
    expect(js.document.elementX[1]).toEqual('');

    expect(js.document.elementY).toBeDefined();
    expect(js.document.elementY.toString()).toEqual('hello there');
    expect(js.document.elementY).toEqual('hello there');

    expect(js.document.elementZ).toBeDefined();
    expect(js.document.elementZ.toString()).toEqual('hello again');
    expect(js.document.elementZ).toEqual('hello again');

    expect(js.document.elementZA).toBeDefined();
    expect(js.document.elementZA.toString()).toEqual('Test hello again');
    expect(js.document.elementZA.__cdata).toEqual(' hello again');

    expect(js.document.elementZB).toBeDefined();
    expect(js.document.elementZB.toString()).toEqual('hello again');
    expect(js.document.elementZB._attribute).toEqual('value');
    expect(js.document.elementZB.__cdata).toEqual('hello again');
  });

  it('XML with namespace prefixes', () => {
    const xml =
      '<ns:root xmlns:ns="http://example.com" xmlns:ns2="http://example.com(2)">' +
      '<nonamespace>' +
      '<ns2:el ns:attribute="yes" />' +
      '</nonamespace>' +
      '</ns:root>';

    const x = new X2JS();
    const js = x.xml2js(xml);

    // We don't understand namespaces but we do remember the prefixes.
    expect(js).toBeDefined();
    expect(js.root).toBeDefined();
    expect(js.root.__prefix).toEqual('ns');
    expect(js.root.nonamespace).toBeDefined();
    expect(js.root.nonamespace.el).toBeDefined();
    expect(js.root.nonamespace.el.__prefix).toEqual('ns2');

    // Except for attributes, which we don't acknowledge can even use namespaces.
    // Perhaps not the most convenient but whatever, not an important feature.
    expect(js.root.nonamespace.el['_ns:attribute']).toBeDefined();
  });

  it('XML with declaration', () => {
    const xml =
      '<?xml version="1.0" encoding="utf-8" ?>\n' +
      '<document>' +
      '<element>great success</element>' +
      '</document>';

    const x = new X2JS();
    const js = x.xml2js(xml);

    // We don't understand namespaces but we do remember the prefixes.
    expect(js).toBeDefined();
    expect(js.document).toBeDefined();
    expect(js.document.element).toEqual('great success');
  });

  it('Passing non-string to xml2js returns null', () => {
    const x = new X2JS();

    expect(x.xml2js('{ "wololo": "rogan" }')).toBeNull();
    expect(x.xml2js('99')).toBeNull();
    expect(x.xml2js(undefined)).toBeNull();
  });
});
