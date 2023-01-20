import { ICaseTransform } from './transforms/case-transform'
import TRANSLATION_TEXTS from './translation-texts'
import { INumToTextOptions, NumToTextCaseStyle, NumToTextGenderStyle } from './types'

export default class NumToTextConverter {

  private texts = TRANSLATION_TEXTS

  constructor(private transforms: ICaseTransform[]) { }

  translate(num: number, options?: INumToTextOptions): string {
    const opts = this.ensureOptions(options)
    const casing = this.getCasing(opts)
    const mmForm = !!options?.suffix
    const arr: string[] = []
    const parts = this.getParts(num).reverse()


    parts.forEach((part, index) => {
      const singular = (part === 1)
      switch (index) {
        case 0:
          if (part > 0 || (part === 0 && parts.length === 1))
            arr.push(this.reduceTranslation(part, mmForm, opts.gender))
          break
        case 1:
          if (part > 0)
            arr.push(this.directTranslate(1000 ** index, mmForm, opts.gender))
          if (part > 1) {
            arr.push(this.reduceTranslation(part, mmForm, opts.gender))
          }
          break
        case 2:
          arr.push(this.directTranslate(1000 ** index, singular, NumToTextGenderStyle.MASCULINE))
          arr.push(this.reduceTranslation(part, true, NumToTextGenderStyle.MASCULINE))
          break
        default:
          arr.push(this.reduceTranslation(part, true, NumToTextGenderStyle.MASCULINE))
          break
      }
    })
    arr.reverse()
    const ret = `${arr.join(' ')} ${this.getSuffix(num, opts)}`.trim()
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
    if (!casing) return this.transforms[0]
    return casing
  }

  private getParts(num: number): number[] {
    return num.toLocaleString('es-cl', { maximumFractionDigits: 0 }).split('.').map(chunk => parseInt(chunk, 10))
  }

  private reduceTranslation(num: number, mmForm: boolean, gender: NumToTextGenderStyle): string {
    if (num >= 0 && num < 30) {
      return this.directTranslate(num, mmForm, gender)
    }
    if (num < 100) { // 98
      const units = num % 10
      if (units === 0) {
        return this.directTranslate(num, mmForm, gender) // 90
      }
      return `${this.directTranslate(num - units, mmForm, gender)} y ${this.reduceTranslation(units, mmForm, gender)}`
    }
    if (num <= 999) {
      const tens = num % 100
      const hundreds = num - tens
      if (tens === 0) {
        return this.directTranslate(num, mmForm, gender)
      }
      if (num <= 199) {
        return `ciento ${this.reduceTranslation(num - 100, mmForm, gender)}`
      }
      return `${this.directTranslate(hundreds, mmForm, gender)} ${this.reduceTranslation(tens, mmForm, gender)}`
    }
    return this.getNoTranslate(num)
  }

  private directTranslate(num: number, mmForm: boolean, genderStyle: NumToTextGenderStyle): string {
    const text = this.texts.find(t => t.num === num)
    if (!text) return this.getNoTranslate(num)
    if (genderStyle === NumToTextGenderStyle.MASCULINE) {
      return (mmForm ? (text.mm || text.txt) : text.txt)
    }
    return (text.fem || text.txt)
  }

  private getNoTranslate(num: number): string {
    return `(${num})`
  }

}

