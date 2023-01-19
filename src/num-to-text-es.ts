export type Gender = 'F' | 'M'

export interface NumToTextOptions {
  gender: Gender
}

export class NumToTextConverter {

  private readonly opts: NumToTextOptions;

  constructor(options?: NumToTextOptions) {
    this.opts = { gender: 'M', ...(options || {}) };
  }

  translate(num: number): string {
    return num?.toString()
  }
}

