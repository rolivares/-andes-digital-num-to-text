import { ICaseTransform } from './transforms/case-transform'
import TRANSLATION_TEXTS, { BILLION } from './translation-texts'
import { INumToTextConverter, INumToTextOptions, NumToTextCaseStyle, NumToTextGenderStyle } from './types'

export default class EsNumToTextConverter implements INumToTextConverter {

  private texts = TRANSLATION_TEXTS

  constructor(private transforms: ICaseTransform[]) { }

  translate(num: number, options?: INumToTextOptions): string {

    if (num >= BILLION) throw new Error(`Not implemented for numbers greater than ${(BILLION - 1).toLocaleString('es-cl')}`)

    const opts = this.ensureOptions(options)
    const casing = this.getCasing(opts)
    const mmForm = !!options?.suffix
    const chunks: string[] = []
    const parts = this.getParts(num).reverse()

    parts.forEach((part, index) => {
      const singular = (part === 1)
      switch (index) {
        case 0:
          if (part > 0 || (part === 0 && parts.length === 1))
            chunks.push(this.reduceTranslation(part, mmForm, opts.gender))
          break
        case 1:
          if (part > 0)
            chunks.push(this.directTranslate(1000 ** index, mmForm, opts.gender))
          if (part > 1) {
            chunks.push(this.reduceTranslation(part, mmForm, opts.gender))
          }
          break
        case 2:
        default:
          chunks.push(this.directTranslate(1000 ** index, singular, NumToTextGenderStyle.MASCULINE))
          chunks.push(this.reduceTranslation(part, true, NumToTextGenderStyle.MASCULINE))
          break
      }
    })
    chunks.reverse()
    const ret = `${chunks.map(c => c.trim()).join(' ')} ${this.getSuffix(num, opts)}`.trim()
    return casing.transform(ret)
  }

  private getSuffix(num: number, options: INumToTextOptions): string {
    if (options.suffix) {
      return num === 1 ? options.suffix.singular : options.suffix.plural
    }
    return ''
  }

  private ensureOptions(options?: INumToTextOptions): INumToTextOptions {
    return { gender: NumToTextGenderStyle.MASCULINE, case: NumToTextCaseStyle.TITLE_CASE, ...(options || {}) }
  }

  private getCasing(options: INumToTextOptions) {
    const casing = this.transforms.find(t => t.type === options.case)
    if (!casing) return this.transforms.find(t => t.type === NumToTextCaseStyle.TITLE_CASE)
    return casing
  }

  private getParts(num: number): number[] {
    return num.toLocaleString('es-cl', { maximumFractionDigits: 0 }).split('.').map(chunk => parseInt(chunk, 10))
  }

  private reduceTranslation(num: number, mmForm: boolean, gender: NumToTextGenderStyle): string {
    if (num >= 0 && num < 30) {
      return this.directTranslate(num, mmForm, gender)
    }
    if (num < 100) {
      const units = num % 10
      if (units === 0) {
        return this.directTranslate(num, mmForm, gender)
      }
      return `${this.directTranslate(num - units, mmForm, gender)} y ${this.reduceTranslation(units, mmForm, gender)}`
    }
    // by construction this method is called only on numbers less than 1000
    const tens = num % 100
    const hundreds = num - tens
    if (tens === 0) {
      return this.directTranslate(num, mmForm, gender)
    }
    if (num <= 199) {
      return `ciento ${this.reduceTranslation(num - 100, mmForm, gender)} `
    }
    return `${this.directTranslate(hundreds, mmForm, gender)} ${this.reduceTranslation(tens, mmForm, gender)} `
  }

  private directTranslate(num: number, mmForm: boolean, genderStyle: NumToTextGenderStyle): string {
    const text = this.texts.find(t => t.num === num)
    if (genderStyle === NumToTextGenderStyle.MASCULINE) {
      return (mmForm ? (text.ap || text.txt) : text.txt)
    }
    return (text.fem || text.txt)
  }

}

