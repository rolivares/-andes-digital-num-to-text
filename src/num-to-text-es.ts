import { ICaseTransform } from 'src/transforms/case-transform';
import TRANSLATION_TEXTS from 'src/translation-texts';
import { INumToTextOptions } from 'src/types';

export default class NumToTextConverter {

  private texts = TRANSLATION_TEXTS

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
    parts.forEach(part => {
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
        return this.translatePeculiars(num, mmForm) // 90
      }
      return `${this.translatePeculiars(num - units, mmForm)} y ${this.getTranslation(units, mmForm)}`
    }
    if (num <= 999) {
      const tens = num % 100
      const hundreds = num - tens
      if (tens === 0) {
        return this.translatePeculiars(num, mmForm)
      }
      if (num <= 199) {
        return `ciento ${this.getTranslation(num - 100, mmForm)}`
      }
      return `${this.translatePeculiars(hundreds, mmForm)} ${this.getTranslation(tens, mmForm)}`
    }
    return this.getNoTranslate(num)
  }

  private translatePeculiars(num: number, mmForm: boolean): string {
    const text = this.texts.find(t => t.num === num)
    if (!text) return this.getNoTranslate(num)
    return (mmForm ? (text.mm || text.txt) : text.txt)
  }

  private getNoTranslate(num: number): string {
    return `(${num})`
  }

}

