import { NumToTextCasing } from '../types'

export interface ICaseTransform {
  readonly type: NumToTextCasing
  transform(input: string): string
}


