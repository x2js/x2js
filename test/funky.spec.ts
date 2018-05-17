import X2JS from '../src/x2js'

/**
 * Funky tests
 */
describe('Funky tests', () => {
  it('asArray() converts to array', () => {
    const x = new X2JS()

    // It preserves existing arrays.
    expect(x.asArray([1, 2, 3])).toEqual([1, 2, 3])

    // And converts anything else.
    expect(x.asArray('stringvalue')).toEqual(['stringvalue'])
    expect(x.asArray({})).toEqual([{}])
    expect(x.asArray('')).toEqual([''])

    // // Except some things, which are turned into empty arrays just because.
    expect(x.asArray(null)).toEqual([])
    expect(x.asArray(undefined)).toEqual([])
  })
})
