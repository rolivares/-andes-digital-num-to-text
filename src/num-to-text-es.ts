import { ICaseTransform } from 'src/transforms/case-transform';
import { PECULIAR_TEXTS, TENS_TEXTS } from 'src/translation-texts';
import { INumToTextOptions } from 'src/types';

export default class NumToTextConverter {

  private texts = {
    ones: PECULIAR_TEXTS,
    tens: TENS_TEXTS
  }

  constructor(private transforms: ICaseTransform[]) { }

  private getOptions(options?: INumToTextOptions): INumToTextOptions {
    return { gender: 'M', case: 'TITLE_CASE', ...(options || {}) };
  }

  getCasing(options: INumToTextOptions) {
    const casing = this.transforms.find(t => t.type === options.case)
    if (!casing) return this.transforms[0]
    return casing
  }

  translate(num: number, options?: INumToTextOptions): string {
    const opts = this.getOptions(options)
    const casing = this.getCasing(opts)

    const arr: string[] = []
    const parts = this.getParts(num).reverse()
    parts.forEach((part, index) => {
      arr.push(this.getTranslation(part, false))
    })
    const ret = arr.join(' ')
    return casing.transform(ret)
  }

  getParts(num: number): number[] {
    return num.toLocaleString('es-cl', { maximumFractionDigits: 0 }).split('.').map(chunk => parseInt(chunk, 10))
  }

  private getTranslation(num: number, mmForm: boolean): string {
    if (num >= 0 && num < 30) {
      return this.translatePeculiars(num, mmForm)
    }
    if (num < 100) { // 98
      const units = num % 10
      if (units === 0) {
        return this.translateTens(num, mmForm) // 90
      }
      return `${this.translateTens(num - units, mmForm)} y ${this.getTranslation(units, mmForm)}`
    }
    return this.getNoTranslate(num)
  }

  private translatePeculiars(num: number, mmForm: boolean): string {
    const text = this.texts.ones.find(t => t.num === num)
    if (!text) return this.getNoTranslate(num)
    return (mmForm ? (text.mm || text.txt) : text.txt)
  }

  private translateTens(num: number, mmForm: boolean): string {
    const text = this.texts.tens.find(t => t.num === num)
    return (mmForm ? (text.mm || text.txt) : text.txt)
  }

  private getNoTranslate(num: number): string {
    return `(${num})`
  }

}

