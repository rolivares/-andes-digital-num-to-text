import { expect } from 'chai'
import { describe, it } from 'mocha'
import TitleCaseTransform from 'src/transforms/title-case-transform'

describe('TitleCaseTransform', () => {
  const caseTransform = new TitleCaseTransform()

  it('Transform', () => {
    expect(caseTransform.transform(null)).is.null
    expect(caseTransform.transform('a')).equal('A')
    expect(caseTransform.transform('TEXTO TODO MAYÚSCULA CON TILDE')).equal('Texto todo mayúscula con tilde')
    expect(caseTransform.transform('Otra opción')).equal('Otra opción')
  })

})
