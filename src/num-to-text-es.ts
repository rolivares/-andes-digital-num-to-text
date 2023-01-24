import { ICaseTransform } from './transforms/case-transform'
import TRANSLATION_TEXTS, { FIRST_VALUE_UNSUPPORTED, HUNDRED, THOUSAND } from './translation-texts'
import { INumToTextConverter, INumToTextOptions, NumToTextCaseStyle, NumToTextGenderStyle } from './types'

export default class EsNumToTextConverter implements INumToTextConverter {

  private texts = TRANSLATION_TEXTS

  constructor(private transforms: ICaseTransform[]) { }

  translate(num: number, options?: INumToTextOptions): string {

    const opts = this.ensureOptions(options)
    const hasSuffix = !!opts.suffix

    if (num >= FIRST_VALUE_UNSUPPORTED)
      throw new Error(`Not implemented for numbers greater than ${(FIRST_VALUE_UNSUPPORTED).toLocaleString('es-cl')}`)

    const casing = this.getCasing(opts)
    const chunks: string[] = []
    const parts = this.getParts(num)
    let ended = ''
    parts.forEach((part, index) => {
      let useApocopate: boolean
      if (part > 0 && index > 0) {
        useApocopate = part === 1
        ended = this.directTranslate(this.getDivisor(index - 1), useApocopate, opts.gender)
        chunks.push(ended)
      }
      if ((part === 1 && index !== 1) || (part === 0 && parts.length === 1) || (part > 1 && parts.length >= 1)) {
        useApocopate = hasSuffix || (part === 1 && index > 1) || index > 1
        chunks.push(this.reduceTranslation(part, useApocopate, index === 0 ? opts.gender : NumToTextGenderStyle.MASCULINE))
      }
    })

    // console.log('translate ===>', { num: num.toLocaleString('es-cl'), parts, chunks })
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

  public getDivisor(index: number): number {
    if (index === 0) return 1000
    const rest = 10 ** (3 * (2 * index))
    return rest
  }

  public getPortion(num: number, index: number): number {
    if (index === 0) {
      return num % this.getDivisor(0)
    }
    const expPrev = this.getDivisor(index - 1)
    const expCurr = this.getDivisor(index)
    const rest = (Math.round((num - (num % expPrev))) % expCurr) / expPrev
    return rest
  }

  /**
   * Returns an array with splitted portions of tokens ordered from units to higher values
   * @param num
   * @returns array of number with grouped values
   */
  public getParts(num: number): number[] {
    const arr: number[] = []
    let index = 0
    do {
      arr.push(this.getPortion(num, index))
      index += 1
    } while (num >= this.getDivisor(index - 1))

    return arr
  }

  private reduceTranslation(num: number, mmForm: boolean, gender: NumToTextGenderStyle): string {
    if (num >= 0 && num < 30) { // 11
      return this.directTranslate(num, mmForm, gender)
    }
    if (num < 100) { // 54, 40
      const units = num % 10
      if (units === 0) {  // 40
        return this.directTranslate(num, mmForm, gender)
      }
      return `${this.directTranslate(num - units, mmForm, gender)} y ${this.reduceTranslation(units, mmForm, gender)}` // 54
    } if (num <= 999) {
      // 800, 564
      const tens = num % 100
      if (tens === 0)  // 800
        return `${this.directTranslate(num, mmForm, gender)}`
      const suffix = num - tens === HUNDRED ? 'to' : ''
      return `${this.directTranslate(num - tens, mmForm, gender)}${suffix} ${this.reduceTranslation(tens, mmForm, gender)}`
    }

    const hundreds = this.getPortion(num, 0)
    const thousands = this.getPortion(num, 1)

    return [
      this.reduceTranslation(thousands, mmForm, gender),
      this.directTranslate(THOUSAND, mmForm, gender),
      this.reduceTranslation(hundreds, mmForm, gender)].join(' ')
  }

  private directTranslate(num: number, apocopate: boolean, genderStyle: NumToTextGenderStyle): string {
    const text = this.texts.find(t => t.num === num)
    if (genderStyle === NumToTextGenderStyle.MASCULINE) {
      return (apocopate ? (text.ap || text.txt) : text.txt)
    }
    return (text.fem || text.txt)
  }

}

