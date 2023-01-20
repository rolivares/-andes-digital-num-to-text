import { expect } from 'chai'
import { describe, it } from 'mocha'
import UpperCaseTransform from 'src/transforms/upper-case-transform'

describe('UpperCaseTransform', () => {
  const caseTransform = new UpperCaseTransform()

  it('Transform', () => {
    expect(caseTransform.transform(null)).is.null
    expect(caseTransform.transform('á')).equal('Á')
    expect(caseTransform.transform('TEXTO TODO MAYÚSCULA CON TILDE')).equal('TEXTO TODO MAYÚSCULA CON TILDE')
    expect(caseTransform.transform('Otra opción')).equal('OTRA OPCIÓN')
  })

})
