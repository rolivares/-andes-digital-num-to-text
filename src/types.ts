export type NumToTextGenderStyle = 'F' | 'M'
export const NumToTextGenderStyle = {
  FEMININE: 'F' as NumToTextGenderStyle,
  MASCULINE: 'M' as NumToTextGenderStyle
}

export type NumToTextCasing = 'UPPER_CASE' | 'LOWER_CASE' | 'TITLE_CASE'
export const NumToTextCasing = {
  UPPER_CASE: 'UPPER_CASE' as NumToTextCasing,
  LOWER_CASE: 'LOWER_CASE' as NumToTextCasing,
  TITLE_CASE: 'TITLE_CASE' as NumToTextCasing
}

export interface INumToTextOptions {
  gender?: NumToTextGenderStyle,
  case?: NumToTextCasing,
  suffix?: {
    plural: string
    singular: string
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
