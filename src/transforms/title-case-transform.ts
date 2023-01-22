import { ICaseTransform } from './case-transform'
import { NumToTextCaseStyle } from '../types'

export default class TitleCaseTransform implements ICaseTransform {
  get type(): NumToTextCaseStyle {
    return 'TITLE_CASE'
  }

  transform(input: string): string {
    if (!input) return input
    if (input.length === 1) return input.toUpperCase()
    return `${input.substring(0, 1).toUpperCase()}${input.substring(1).toLowerCase()}`
  }
}
