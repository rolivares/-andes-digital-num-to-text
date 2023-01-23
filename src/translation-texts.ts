import { ITranslationText } from './types'

export const HUNDRED = 100
export const THOUSAND = 1000
export const MILLION = 1000000
export const BILLION = MILLION * MILLION

const TRANSLATION_TEXTS: ITranslationText[] = [
  { num: 0, txt: 'cero' },
  { num: 1, txt: 'uno', ap: 'un', fem: 'una' },
  { num: 2, txt: 'dos' },
  { num: 3, txt: 'tres' },
  { num: 4, txt: 'cuatro' },
  { num: 5, txt: 'cinco' },
  { num: 6, txt: 'seis' },
  { num: 7, txt: 'siete' },
  { num: 8, txt: 'ocho' },
  { num: 9, txt: 'nueve' },
  { num: 10, txt: 'diez' },
  { num: 11, txt: 'once' },
  { num: 12, txt: 'doce' },
  { num: 13, txt: 'trece' },
  { num: 14, txt: 'catorce' },
  { num: 15, txt: 'quince' },
  { num: 16, txt: 'dieciséis' },
  { num: 17, txt: 'diecisiete' },
  { num: 18, txt: 'dieciocho' },
  { num: 19, txt: 'diecinueve' },
  { num: 20, txt: 'veinte' },
  { num: 21, txt: 'veintiuno', ap: 'veintiún', fem: 'veintiuna' },
  { num: 22, txt: 'veintidós' },
  { num: 23, txt: 'veintitrés' },
  { num: 24, txt: 'veinticuatro' },
  { num: 25, txt: 'veinticinco' },
  { num: 26, txt: 'veintiséis' },
  { num: 27, txt: 'veintisiete' },
  { num: 28, txt: 'veintiocho' },
  { num: 29, txt: 'veintinueve' },

  { num: 30, txt: 'treinta' },
  { num: 40, txt: 'cuarenta' },
  { num: 50, txt: 'cincuenta' },
  { num: 60, txt: 'sesenta' },
  { num: 70, txt: 'setenta' },
  { num: 80, txt: 'ochenta' },
  { num: 90, txt: 'noventa' },

  { num: HUNDRED, txt: 'cien' },
  { num: 200, txt: 'doscientos', fem: 'doscientas' },
  { num: 300, txt: 'trescientos', fem: 'trescientas' },
  { num: 400, txt: 'cuatrocientos', fem: 'cuatrocientas' },
  { num: 500, txt: 'quinientos', fem: 'quinientas' },
  { num: 600, txt: 'seiscientos', fem: 'seiscientas' },
  { num: 700, txt: 'setecientos', fem: 'setecientas' },
  { num: 800, txt: 'ochocientos', fem: 'ochocientas' },
  { num: 900, txt: 'novecientos', fem: 'novecientas' },

  { num: THOUSAND, txt: 'mil', ap: 'mil' },
  { num: MILLION, txt: 'millones', ap: 'millón' },
  { num: BILLION, txt: 'billones', ap: 'billón' }

]

export default TRANSLATION_TEXTS



