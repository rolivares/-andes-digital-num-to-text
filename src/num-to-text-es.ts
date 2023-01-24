import { ICaseTransform } from './transforms/case-transform'
import TRANSLATION_TEXTS, { FIRST_VALUE_UNSUPPORTED, HUNDRED, TENS, THOUSAND } from './translation-texts'
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
      if (this.mustAddSeparator(part, index)) {
        useApocopate = part === 1
        ended = this.directTranslate(this.getPartsDivisor(index - 1), useApocopate, opts.gender)
        chunks.push(ended)
      }
      if (this.isNotThousandPart(part, index) || this.isZeroValue(part, parts) || this.isNotZeroPart(part, parts)) {
        useApocopate = hasSuffix || (part === 1 && index > 1) || index > 1
        chunks.push(this.reduceTranslation(part, useApocopate, index === 0 ? opts.gender : NumToTextGenderStyle.MASCULINE))
      }
    })

    // console.log('translate ===>', { num: num.toLocaleString('es-cl'), parts, chunks })
    chunks.reverse()
    const ret = `${chunks.map(c => c.trim()).join(' ')} ${this.getSuffix(num, opts)}`.trim()
    return casing.transform(ret)
  }

  private isNotZeroPart(part: number, parts: number[]): boolean {
    return part > 1 && parts.length >= 1
  }

  private isZeroValue(part: number, parts: number[]): boolean {
    return part === 0 && parts.length === 1
  }

  private isNotThousandPart(part: number, index: number) {
    return part === 1 && index !== 1
  }

  private mustAddSeparator(part: number, index: number) {
    return part > 0 && index > 0
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

  public getPartsDivisor(index: number): number {
    if (index === 0) return THOUSAND
    const rest = 10 ** (3 * (2 * index))
    return rest
  }

  public getPortion(num: number, index: number): number {
    if (index === 0) {
      return num % this.getPartsDivisor(0)
    }
    const expPrev = this.getPartsDivisor(index - 1)
    const expCurr = this.getPartsDivisor(index)
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
    } while (num >= this.getPartsDivisor(index - 1))

    return arr
  }

  private reduceTranslation(num: number, apocopate: boolean, gender: NumToTextGenderStyle): string {
    if (num >= 0 && num < 30) { // 11
      return this.directTranslate(num, apocopate, gender)
    }
    if (num < 100) { // 54, 40
      const rest = num % TENS
      if (rest === 0)   // 40
        return this.directTranslate(num, apocopate, gender)
      return `${this.directTranslate(num - rest, apocopate, gender)} y ${this.reduceTranslation(rest, apocopate, gender)}` // 54
    }
    if (num <= 999) {
      // 800, 564
      const rest = num % HUNDRED
      if (rest === 0)  // 800
        return `${this.directTranslate(num, apocopate, gender)}`
      const hundredsSuffix = num - rest === HUNDRED ? 'to' : ''
      return `${this.directTranslate(num - rest, apocopate, gender)}${hundredsSuffix} ${this.reduceTranslation(rest, apocopate, gender)}` // 564
    }

    const hundreds = this.getPortion(num, 0)
    const thousands = this.getPortion(num, 1)

    return [
      this.reduceTranslation(thousands, apocopate, gender),
      this.directTranslate(THOUSAND, apocopate, gender),
      this.reduceTranslation(hundreds, apocopate, gender)
    ].join(' ')
  }

  private directTranslate(num: number, apocopate: boolean, genderStyle: NumToTextGenderStyle): string {
    const text = this.texts.find(t => t.num === num)
    if (genderStyle === NumToTextGenderStyle.MASCULINE) {
      return (apocopate ? (text.ap || text.txt) : text.txt)
    }
    return (text.fem || text.txt)
  }

}

