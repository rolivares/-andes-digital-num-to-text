import { ICaseTransform } from 'src/transforms/case-transform'
import { NumToTextCasing } from 'src/types'

export default class TitleCaseTransform implements ICaseTransform {
  get type(): NumToTextCasing {
    return 'TITLE_CASE'
  }

  transform(input: string): string {
    if (!input) return input
    if (input.length === 1) return input.toUpperCase()
    return `${input.substring(0, 1).toUpperCase()}${input.substring(1).toLowerCase()}`
  }
}
