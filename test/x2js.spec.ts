import X2JS from '../src/x2js';

/**
 * XML to JS test
 */
describe('X2JS', () => {
  it('Should be instanciate', () => {
    const x2js = new X2JS();
    expect(x2js).toBeInstanceOf(X2JS);
  });
});
