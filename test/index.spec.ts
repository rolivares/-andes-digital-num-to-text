import { expect } from 'chai'
import { describe } from 'mocha'
import { numToText, NumToTextCaseStyle, NumToTextConverter, NumToTextGenderStyle } from 'src'

describe('index', () => {

  it('default export', () => {
    expect(numToText).is.not.null
  })

  it('Create custom', () => {
    expect(new NumToTextConverter([])).is.not.null
  })

  it('Types', () => {
    expect(NumToTextCaseStyle.LOWER_CASE).is.not.null
    expect(NumToTextGenderStyle.FEMININE).is.not.null
  })
})
