import { ICaseTransform } from './case-transform'
import { NumToTextCasing } from '../types'

export default class LowerCaseTransform implements ICaseTransform {
  get type(): NumToTextCasing {
    return 'LOWER_CASE'
  }

  transform(input: string): string {
    return input?.toLowerCase() || null
  }
}
