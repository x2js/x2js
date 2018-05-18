import X2JS, { X2JSConfig } from '../src/x2js'

/**
 * Configuration options tests
 */
describe('Configuration options', () => {
  it('Default attribute prefix', () => {
    const xml = '<document><element attribute="value" /></document>'
    const x = new X2JS()
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element).toBeDefined()
    expect(js.document.element._attribute).toBeDefined()
    expect(js.document.element._attribute).toEqual('value')
  })

  it('Empty attribute prefix', () => {
    const xml = '<document><element attribute="value" /></document>'
    const x = new X2JS({
      attributePrefix: ''
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element).toBeDefined()
    expect(js.document.element.attribute).toBeDefined()
    expect(js.document.element.attribute).toEqual('value')
  })

  it('Custom nonempty attribute prefix', () => {
    const xml = '<document><element attribute="value" /></document>'
    const x = new X2JS({
      attributePrefix: '$$'
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element).toBeDefined()
    expect(js.document.element.$$attribute).toBeDefined()
    expect(js.document.element.$$attribute).toEqual('value')
  })

  it('Attribute converters run but only when appropriate', () => {
    const xml =
      '<Root><element test1="FAIL" test2="success 2.1">first</element><element test1="FAIL 1.2" test2="success 2.2">second</element></Root>'
    const x = new X2JS({
      attributeConverters: [
        {
          test: function(name, value) {
            return name === 'test1'
          },
          convert: function(name, value) {
            return 'success 1.*'
          }
        }
      ]
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.Root).toBeDefined()
    expect(js.Root.element).toBeDefined()
    expect(js.Root.element.length).toBeDefined()
    expect(js.Root.element[0]).toBeDefined()
    expect(js.Root.element[0]._test1).toBeDefined()
    expect(js.Root.element[0]._test2).toBeDefined()
    expect(js.Root.element[0]._test1).toEqual('success 1.*')
    expect(js.Root.element[0]._test2).toEqual('success 2.1')
    expect(js.Root.element[1]._test1).toEqual('success 1.*')
    expect(js.Root.element[1]._test2).toEqual('success 2.2')
  })

  it('Root element is dropped with ignoreRoot=true', () => {
    const xml = '<document><element attribute="value" /></document>'
    const x = new X2JS({
      ignoreRoot: true
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).not.toBeDefined()
    expect(js.element).toBeDefined()
  })

  it('Array access-form override via path', () => {
    const xml = '<document><element attribute="value" /></document>'
    const x = new X2JS({
      arrayAccessFormPaths: ['document.element']
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element).toBeDefined()
    expect(js.document.element.length).toBeDefined()
    expect(js.document.element.length).toEqual(1)
    // expect(js.document.element[0]).toEqual('value');

    // assert.ok(js.document.element[0], 'value'); // TODO Check
  })

  it('Array access-form override via regex', () => {
    const xml = '<document><element attribute="value" /></document>'
    const x = new X2JS({
      arrayAccessFormPaths: [/.*\.element$/]
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element).toBeDefined()
    expect(js.document.element.length).toBeDefined()
    expect(js.document.element.length).toEqual(1)
    // expect(js.document.element[0]).toEqual('value');

    // assert.ok(js.document.element[0], 'value'); // TODO Check
  })

  it('Array access-form override via function', () => {
    const xml = '<document><element attribute="value" /></document>'
    const x = new X2JS({
      arrayAccessFormPaths: [
        function(elementName, elementPath) {
          return elementName === 'element'
        }
      ]
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element).toBeDefined()
    expect(js.document.element.length).toBeDefined()
    expect(js.document.element.length).toEqual(1)
    // expect(js.document.element[0]).toEqual('value');

    // assert.ok(js.document.element[0], 'value'); // TODO Check
  })

  it('Datetime parsing via path', () => {
    const xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>'
    const x = new X2JS({
      datetimeAccessFormPaths: ['document.datetimeElement']
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.datetimeElement).toBeDefined()
    expect(js.document.datetimeElement instanceof Date).toBeTruthy()
    expect(js.document.datetimeElement.getFullYear()).toEqual(2002)
  })

  it('Datetime parsing via regex', () => {
    const xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>'
    const x = new X2JS({
      datetimeAccessFormPaths: [/.*\.datetimeElement$/]
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.datetimeElement).toBeDefined()
    expect(js.document.datetimeElement instanceof Date).toBeTruthy()
    expect(js.document.datetimeElement.getFullYear()).toEqual(2002)
  })

  it('Datetime parsing via function', () => {
    const xml = '<document><datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement></document>'
    const x = new X2JS({
      datetimeAccessFormPaths: [
        function(elementPath) {
          return elementPath === 'document.datetimeElement'
        }
      ]
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.datetimeElement).toBeDefined()
    expect(js.document.datetimeElement instanceof Date).toBeTruthy()
    expect(js.document.datetimeElement.getFullYear()).toEqual(2002)
  })

  it('Datetime parsing in different formats', () => {
    const xml =
      '<document>' +
      '<datetimeElement>2002-10-10T12:00:00+04:00</datetimeElement>' +
      '<datetimeElement>2002-10-10T12:00:00Z</datetimeElement>' +
      '<datetimeElement>2002-10-10T12:00:00</datetimeElement>' +
      '<datetimeElement>2002-10-10T12:00:00Z</datetimeElement>' +
      '</document>'
    const x = new X2JS({
      datetimeAccessFormPaths: ['document.datetimeElement']
    } as X2JSConfig)
    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.datetimeElement).toBeDefined()
    expect(js.document.datetimeElement.length).toBeDefined()
    expect(js.document.datetimeElement.length).toEqual(4)

    js.document.datetimeElement.forEach(elem => {
      expect(elem).toBeDefined()
      expect(elem instanceof Date).toBeTruthy()
      expect(elem.getFullYear()).toEqual(2002)
    })
  })
})
