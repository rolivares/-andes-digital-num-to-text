import { ICaseTransform } from './case-transform'
import { NumToTextCasing } from '../types'

export default class UpperCaseTransform implements ICaseTransform {
  get type(): NumToTextCasing {
    return 'UPPER_CASE'
  }

  transform(input: string): string {
    return input?.toUpperCase() || null
  }
}
