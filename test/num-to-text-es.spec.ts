import { expect } from "chai";
import { describe, it } from 'mocha';
import NumToTextConverter from 'src/num-to-text-es';
import { ICaseTransform } from 'src/transforms/case-transform';
import LowerCaseTransform from 'src/transforms/lower-case-transform';
import TitleCaseTransform from 'src/transforms/title-case-transform';
import UpperCaseTransform from 'src/transforms/upper-case-transform';

describe("converter.translateConverter", () => {
  const transforms: ICaseTransform[] = [
    new LowerCaseTransform(),
    new UpperCaseTransform(),
    new TitleCaseTransform()
  ]
  const converter = new NumToTextConverter(transforms);;

  it(`Simple numbers`, () => {
    expect(converter.translate(1)).equal('Uno');
    expect(converter.translate(2)).equal('Dos');
    expect(converter.translate(3)).equal('Tres');
    expect(converter.translate(4)).equal('Cuatro');
    expect(converter.translate(5)).equal('Cinco');
    expect(converter.translate(6)).equal('Seis');
    expect(converter.translate(7)).equal('Siete');
    expect(converter.translate(8)).equal('Ocho');
    expect(converter.translate(9)).equal('Nueve');
    expect(converter.translate(10)).equal('Diez');
  })

  it(`Numbers 11 => 29 `, () => {
    expect(converter.translate(11)).equal('Once');
    expect(converter.translate(12)).equal('Doce');
    expect(converter.translate(13)).equal('Trece');
    expect(converter.translate(14)).equal('Catorce');
    expect(converter.translate(15)).equal('Quince');
    expect(converter.translate(16)).equal('Dieciséis');
    expect(converter.translate(17)).equal('Diecisiete');
    expect(converter.translate(18)).equal('Dieciocho');
    expect(converter.translate(19)).equal('Diecinueve');
    expect(converter.translate(20)).equal('Veinte');
    expect(converter.translate(21)).equal('Veintiuno');
    expect(converter.translate(22)).equal('Veintidós');
    expect(converter.translate(23)).equal('Veintitrés');
    expect(converter.translate(24)).equal('Veinticuatro');
    expect(converter.translate(25)).equal('Veinticinco');
    expect(converter.translate(26)).equal('Veintiséis');
    expect(converter.translate(27)).equal('Veintisiete');
    expect(converter.translate(28)).equal('Veintiocho');
    expect(converter.translate(29)).equal('Veintinueve');
  })

  it(`*nty numbers round`, () => {
    expect(converter.translate(20)).equal('Veinte');
    expect(converter.translate(30)).equal('Treinta');
    expect(converter.translate(40)).equal('Cuarenta');
    expect(converter.translate(50)).equal('Cincuenta');
    expect(converter.translate(60)).equal('Sesenta');
    expect(converter.translate(70)).equal('Setenta');
    expect(converter.translate(80)).equal('Ochenta');
    expect(converter.translate(90)).equal('Noventa');
  })

  it(`nty numbers with units`, () => {
    expect(converter.translate(37)).equal('Treinta y siete');
    expect(converter.translate(46)).equal('Cuarenta y seis');
    expect(converter.translate(44)).equal('Cuarenta y cuatro');
    expect(converter.translate(51)).equal('Cincuenta y uno');
    expect(converter.translate(61)).equal('Sesenta y uno');
    expect(converter.translate(79)).equal('Setenta y nueve');
    expect(converter.translate(88)).equal('Ochenta y ocho');
    expect(converter.translate(93)).equal('Noventa y tres');
  })

  it(`Hundreded numbers`, () => {
    expect(converter.translate(151)).equal('Ciento cincuenta y uno');
    expect(converter.translate(221)).equal('Doscientos veintiuno');
    expect(converter.translate(346)).equal('Trescientos cuarenta y seis');
    expect(converter.translate(444)).equal('Cuatrocientos cuarenta y cuatro');
    expect(converter.translate(511)).equal('Quinientos once');
    expect(converter.translate(601)).equal('Seiscientos uno');
    expect(converter.translate(700)).equal('Setecientos');
    expect(converter.translate(899)).equal('Ochocientos noventa y nueve');
    expect(converter.translate(923)).equal('Novecientos veintitrés');
  })

  it(`Hundred numbers`, () => {
    expect(converter.translate(100)).equal('Cien');
    expect(converter.translate(200)).equal('Doscientos');
    expect(converter.translate(300)).equal('Trescientos');
    expect(converter.translate(400)).equal('Cuatrocientos');
    expect(converter.translate(500)).equal('Quinientos');
    expect(converter.translate(600)).equal('Seiscientos');
    expect(converter.translate(700)).equal('Setecientos');
    expect(converter.translate(800)).equal('Ochocientos');
    expect(converter.translate(900)).equal('Novecientos');
  })

  // it(`Thousand numbers`, () => {
  //   expect(converter.translate(1000)).equal('Mil');
  //   expect(converter.translate(2000)).equal('Dos mil');
  //   expect(converter.translate(3000)).equal('Tres mil');
  //   expect(converter.translate(4000)).equal('Cuatro mil');
  //   expect(converter.translate(5000)).equal('Cinco mil');
  //   expect(converter.translate(6000)).equal('Seis mil');
  //   expect(converter.translate(7000)).equal('Siete mil');
  //   expect(converter.translate(8000)).equal('Ocho mil');
  //   expect(converter.translate(9000)).equal('Nueve mil');
  // })

  // it(`Others numbers`, () => {
  //   expect(converter.translate(1294)).equal('Mil doscientos noventa y cuatro');
  //   expect(converter.translate(1001, { suffix: 'pesos' })).equal('Mil un pesos', `con sufijo terminación 'un'`);
  //   expect(converter.translate(1001)).equal('Mil uno');
  //   expect(converter.translate(116000)).equal('Ciento dieciséis mil');
  //   expect(converter.translate(935978)).equal('Novecientos treinta y cinco mil novecientos setenta y ocho');
  //   expect(converter.translate(31511003)).equal('Treinta y un millones quinientos once mil tres');

  //   // TODO: error ortográfico
  //   expect(converter.translate(1236721, { suffix: 'pesos' })).equal('Un millón doscientos treinta y seis mil setecientos veintiún pesos');
  //   expect(converter.translate(423, { suffix: 'pesos' })).equal('Cuatrocientos veintitrés pesos');
  //   expect(converter.translate(423)).equal('Cuatrocientos veintitrés');

  //   expect(converter.translate(1236721)).equal('Un millón doscientos treinta y seis mil setecientos veintiuno');
  //   expect(converter.translate(999999999))
  // .equal('Novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve');
  // })

  // it('converter.translate, casing', () => {
  //   expect(converter.translate(1000, { case: 'UPPER_CASE' })).equal('MIL');
  //   expect(converter.translate(1000, { case: 'LOWER_CASE' })).equal('mil');
  //   expect(converter.translate(1000, { case: 'TITLE_CASE' })).equal('Mil');
  // })


});
