import { NumToTextCaseStyle } from '../types'

export interface ICaseTransform {
  readonly type: NumToTextCaseStyle
  transform(input: string): string
}


