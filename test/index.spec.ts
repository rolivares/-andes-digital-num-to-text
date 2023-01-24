import { expect } from 'chai'
import { describe } from 'mocha'
import { numToText, NumToTextConverter } from 'src'
import { CASE_STYLE_LOWER, GENDER_STYLE_FEMININE } from 'src/types'

describe('index', () => {

  it('default export', () => {
    expect(numToText).is.not.null
  })

  it('Create custom', () => {
    expect(new NumToTextConverter([])).is.not.null
  })

  it('Types', () => {
    expect(CASE_STYLE_LOWER).is.not.null
    expect(GENDER_STYLE_FEMININE).is.not.null
  })
})
