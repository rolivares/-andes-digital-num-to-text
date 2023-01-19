import { ICaseTransform } from 'src/transforms/case-transform'
import { NumToTextCasing } from 'src/types'

export default class LowerCaseTransform implements ICaseTransform {
  get type(): NumToTextCasing {
    return 'LOWER_CASE'
  }

  transform(input: string): string {
    return input?.toLowerCase() || null
  }
}
