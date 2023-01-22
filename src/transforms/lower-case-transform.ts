import { ICaseTransform } from './case-transform'
import { NumToTextCaseStyle } from '../types'

export default class LowerCaseTransform implements ICaseTransform {
  get type(): NumToTextCaseStyle {
    return 'LOWER_CASE'
  }

  transform(input: string): string {
    return input?.toLowerCase() || null
  }
}
