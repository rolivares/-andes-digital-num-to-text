# Description

[![npm version](https://badge.fury.io/js/numero-a-texto.svg)](https://npmjs.org/package/numero-a-texto)
[![release](https://img.shields.io/github/release-date/rolivares/numero-a-texto-es-js)](https://www.npmjs.com/package/numero-a-texto?activeTab=versions)
![downloads](https://img.shields.io/npm/dw/numero-a-texto)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rolivares_num-to-text-es-js&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rolivares_num-to-text-es-js)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rolivares_num-to-text-es-js&metric=coverage)](https://sonarcloud.io/summary/new_code?id=rolivares_num-to-text-es-js)
![snyk](https://snyk.io/test/github/rolivares/numero-a-texto/badge.svg)

Simple process in order to translate numbers to texts using spanish rules on cardinal numbering.

* See more in <https://www.rae.es/dpd/cardinales>

Process considers forms 'apocopate' (`apocopado`) and gender using options provided to translate method.

## Restrictions

* Number to translate is using only integer part in order to translate.
* Compatible for numbers between [0 ... 999.999.999.999] (1 billion - 1)

## Next versions

* Simplify translate process
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
# Numeric form
# 'Ciento cincuenta y cuatro mil ochocientos veintiuno'

numToText.translate(154821, { suffix: 'pesos'})
# Cardinal
# 'Ciento cincuenta y cuatro mil ochocientos veintiún pesos'

numToText.translate(154821, { suffix:'personas', gender: 'F' })
# Cardinal using female gender
# 'Ciento cincuenta y cuatro mil ochocientas veintiuna personas'
```
