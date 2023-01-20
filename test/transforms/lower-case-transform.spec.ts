import { expect } from 'chai'
import { describe, it } from 'mocha'
import LowerCaseTransform from 'src/transforms/lower-case-transform'

describe('LowerCaseTransform', () => {
  const caseTransform = new LowerCaseTransform()
  it('Transform', () => {
    expect(caseTransform.transform(null)).is.null
    expect(caseTransform.transform('A')).equal('a')
    expect(caseTransform.transform('TEXTO TODO MAYÚSCULA CON TILDE'))
      .equal('texto todo mayúscula con tilde')
    expect(caseTransform.transform('Otra opción')).equal('otra opción')
  })

})
