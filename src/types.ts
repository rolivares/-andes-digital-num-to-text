export type NumToTextGenderStyle = 'F' | 'M'
export const GENDER_STYLE_MASCULINE: NumToTextGenderStyle = 'M'
export const GENDER_STYLE_FEMININE: NumToTextGenderStyle = 'F'

export type NumToTextCaseStyle = 'UPPER_CASE' | 'LOWER_CASE' | 'TITLE_CASE'
export const CASE_STYLE_UPPER: NumToTextCaseStyle = 'UPPER_CASE'
export const CASE_STYLE_LOWER: NumToTextCaseStyle = 'LOWER_CASE'
export const CASE_STYLE_TITLE: NumToTextCaseStyle = 'TITLE_CASE'


export interface INumToTextOptions {
  gender?: NumToTextGenderStyle,
  case?: NumToTextCaseStyle,
  suffix?: {
    plural: string
    singular?: string
  }
}

export interface ITranslationText {
  readonly num: number
  readonly txt: string
  readonly fem?: string
  /** apocopate */
  readonly ap?: string
}

export interface INumToTextConverter {
  translate(num: number, options?: INumToTextOptions): string
}

