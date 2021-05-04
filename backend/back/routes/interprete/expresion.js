
const { TIPO_INSTRUCCION } = require('../arbol/instrucciones');

const tipoInstruccion = require('../arbol/instrucciones').TIPO_INSTRUCCION;
const tipoOperacion = require('../arbol/instrucciones').TIPO_OPERACION;
const tipoValor = require('../arbol/instrucciones').TIPO_VALOR;
const tipoDato = require('../arbol/tablasimbolos').TIPO_DATO;
const TablaS = require('../arbol/tablasimbolos').TablaS;
const instruccion = require('../arbol/instrucciones').INSTRUCCION;



module.exports.procesarexpresion = procesarexpresion;