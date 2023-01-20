# Description

Utilidad creada para la traducción de números y cifras a español, considerando forma apocopada y género.

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
