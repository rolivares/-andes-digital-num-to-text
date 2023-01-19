import { expect } from "chai";
import { describe, it } from 'mocha'
import { NumToTextConverter } from 'src/num-to-text-es';

describe("NumToTextConverter", () => {
  let converter: NumToTextConverter;

  beforeEach(() => {
    converter = new NumToTextConverter()
  })

  it("return empty map when headers is empty", () => {
    const text = converter.translate(200)
    expect(text).to.not.be.null;
  });
});
