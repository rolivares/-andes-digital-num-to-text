import { ICaseTransform } from './case-transform'
import { NumToTextCaseStyle } from '../types'

export default class UpperCaseTransform implements ICaseTransform {
  get type(): NumToTextCaseStyle {
    return 'UPPER_CASE'
  }

  transform(input: string): string {
    return input?.toUpperCase() || null
  }
}
