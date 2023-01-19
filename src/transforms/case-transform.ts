import { NumToTextCasing } from 'src/types'

export interface ICaseTransform {
  readonly type: NumToTextCasing
  transform(input: string): string
}


