export type Gender = 'F' | 'M'
export type NumToTextCasing = 'UPPER_CASE' | 'LOWER_CASE' | 'TITLE_CASE'

export interface INumToTextOptions {
  gender?: Gender,
  case?: NumToTextCasing,
  suffix?: string
}

export interface ITranslationText {
  readonly num: number
  readonly txt: string
  /** mild-mannered */
  readonly mm?: string
  /** accent mark */
  readonly txtAlt?: string
}
