# Description

Simple process in order to translate numbers to texts using spanish rules on cardinal numbering.

Process considers forms 'mild-mannered' (`apocopado`) and gender using options provided to translate method.

## Restrictions

Number to translate is using only integer part in order to translate.

## Next versions

* Simplify translate process
* Spanish billions compatibility
* Decimal parts
* Automatic pluralization

## Installation

```sh
npm install --save numero-a-texto
```

## Uso

```js
const numToText = require('numero-a-texto')

numToText.translate(154821)
# Numéric form
# 'Ciento cincuenta y cuatro mil ochocientos veintiuno'

numToText.translate(154821, { suffix: 'pesos'})
# Cardinal
# 'Ciento cincuenta y cuatro mil ochocientos veintiún pesos'

numToText.translate(154821, { suffix:'personas', gender: 'F' })
# Cardinal using female gender
# 'Ciento cincuenta y cuatro mil ochocientos veintiuna personas'
```
