import EsNumToTextConverter from './num-to-text-es'
import { ICaseTransform } from './transforms/case-transform'
import LowerCaseTransform from './transforms/lower-case-transform'
import TitleCaseTransform from './transforms/title-case-transform'
import UpperCaseTransform from './transforms/upper-case-transform'
import { INumToTextConverter } from './types'


const transforms: ICaseTransform[] = [
  new LowerCaseTransform(),
  new UpperCaseTransform(),
  new TitleCaseTransform()
]

const defaultConverter = new EsNumToTextConverter(transforms)

export {
  defaultConverter as numToText,
  EsNumToTextConverter as NumToTextConverter,
  EsNumToTextConverter,
  INumToTextConverter
}
