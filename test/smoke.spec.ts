import X2JS from '../src/x2js'

/**
 * Smoke tests
 */
describe('Smoke tests', () => {
  it('X->JS single element', () => {
    const xml = '<document><element>text</element></document>'
    const x = new X2JS()

    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element).toBeDefined()
    expect(js.document.element).toEqual('text')
  })

  it('X->JS two elements', () => {
    const xml =
      '<document><element1>text</element1><element2>text2</element2></document>'
    const x = new X2JS()

    const js = x.xml2js(xml)

    expect(js.document).toBeDefined()
    expect(js.document.element1).toBeDefined()
    expect(js.document.element1).toEqual('text')
    expect(js.document.element2).toBeDefined()
    expect(js.document.element2).toEqual('text2')
  })
})
