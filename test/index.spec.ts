import { expect } from 'chai'
import { describe } from 'mocha'
import { numToText, NumToTextConverter } from 'src'

describe('index', () => {

  it('default export', () => {
    expect(numToText).is.not.null
  })

  it('Create custom', () => {
    expect(new NumToTextConverter([])).is.not.null
  })

})
