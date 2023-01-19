import { ICaseTransform } from 'src/transforms/case-transform'
import { NumToTextCasing } from 'src/types'

export default class UpperCaseTransform implements ICaseTransform {
  get type(): NumToTextCasing {
    return 'UPPER_CASE'
  }

  transform(input: string): string {
    return input?.toUpperCase() || null
  }
}
