import { ICaseTransform } from 'src/transforms/case-transform';
import { TRANSLATION_TEXTS } from 'src/translation-texts';
import { INumToTextOptions } from 'src/types';

export default class NumToTextConverter {

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

    const parts = this.getParts(num).reverse()
    for (let index = 0; index < parts.length; index += 1) {
      const element = parts[index];
    }
    let ret: string
    if (num >= 0 && num < 20) {
      ret = this.translateForOnes(num, false)
    }
    return casing.transform(ret)
  }

  getParts(num: number): number[] {
    return num.toLocaleString('es-cl', { maximumFractionDigits: 0 }).split('.').map(chunk => parseInt(chunk, 10))
  }

  private translateForOnes(num: number, mmForm: boolean): string {
    const text = TRANSLATION_TEXTS.find(t => t.num === num)
    if (!text) return `(${num})`
    return (mmForm ? (text.mm || text.txt) : text.txt)
  }

}

