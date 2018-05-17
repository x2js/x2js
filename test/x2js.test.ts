import X2JS from '../src/x2js'

/**
 * Dummy test
 */
describe('x2js test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('x2js is instantiable', () => {
    expect(new X2JS()).toBeInstanceOf(X2JS)
  })
})
