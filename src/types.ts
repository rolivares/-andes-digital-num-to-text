export type NumToTextGenderStyle = 'F' | 'M'
export const NumToTextGenderStyle = {
  FEMININE: 'F' as NumToTextGenderStyle,
  MASCULINE: 'M' as NumToTextGenderStyle
}

export type NumToTextCaseStyle = 'UPPER_CASE' | 'LOWER_CASE' | 'TITLE_CASE'
export const NumToTextCaseStyle = {
  UPPER_CASE: 'UPPER_CASE' as NumToTextCaseStyle,
  LOWER_CASE: 'LOWER_CASE' as NumToTextCaseStyle,
  TITLE_CASE: 'TITLE_CASE' as NumToTextCaseStyle
}

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
  /** mild-mannered */
  readonly mm?: string
  /** accent mark */
  readonly txtAlt?: string
}

export interface INumToTextConverter {
  translate(num: number, options?: INumToTextOptions): string
}

