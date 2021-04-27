const TIPO_VALOR = {
    ENTERO:         'VAL_ENTERO',
    DOUBLE:         'VAL_DOUBLE',
    BOOL:           'VAL_BOOL',
    CHAR:           'VAL_CHAR',
    STRING:         'VAL_STRING',
    IDENTIFICADOR:  'VAL_IDENTIFICADOR',
}

const TIPO_OPERACION = {
    SUMA:           "OP_SUMA",
    RESTA:          "OP_RESTA",
    MULTIPLICACION: "OP_MULTIPLICACION",
    DIVISION:       "OP_DIVISION",
    POTENCIA:       "OP_POTENCIA",
    MODULO:         "OP_MODULO",
    NEGATIVO:       "OP_NEGATIVO",
    ADICION:        "OP_ADICION",
    SUSTRACCION:    "OP_SUSTRACCION",
    IGUALDAD:       "OP_IGUALDAD",
    DIFERENTE:      "OP_DIFERENTE",
    MENOR:          "OP_MENOR",
    MENORIGUAL:     "OP_MENORIGUAL",
    MAYOR:          "OP_MAYOR",
    MAYORIGUAL:     "OP_MAYORIGUAL",
    OR:             "OP_OR",
    AND:            "OP_AND",
    NOT:            "OP_NOT"
}

const TIPO_INSTRUCCION = {
    IMPRIMIR:           'INSTR_IMPRIMIR',
    DECLARACION:        'INSTR_DECLARACION',
    WHILE:              'INSTR_WHILE',
    IF:                 'INSTR_IF',
    ASIGNACION:         'INSTR_ASIGNACION',
    METODO:             'INSTR_METODO',
    FUNCION:            'INSTR_FUNCION',
    EXEC:               'INSTR_EXEC',
    LLAMADA:            'INSTR_LLAMADA',
    BREAK:              'INSTR_BREAK',
    TERNARIO:           'INSTR_TERNARIO'
}

const INSTRUCCION = {
    nuevaOperacionBinaria :function(tipo, operandoIzq, operandoDer){
        return {
            tipo: tipo,
            operandoIzq: operandoIzq,
            operandoDer: operandoDer
        }
    },
    nuevaOperacionUnaria :function(tipo, operandoIzq){
        return {
            tipo: tipo,
            operandoIzq: operandoIzq,
            operandoDer: undefined
        }
    },
    nuevoValor: function (tipo, valor){
        return {
            tipo: tipo,
            valor: valor
        }
    },
    nuevaDeclaracion: function (tipo, tipo2, id, expresion){
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION,
            tipo_dato1: tipo,
            tipo_dato2: tipo2,
            id: id,
            expresion: expresion
        }
    },
    nuevaAsignacion: function (id, expresion){
        return{
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: id,
            expresion: expresion
        }
    },
    nuevoImprimir: function (expresion){
        return{
            tipo: TIPO_INSTRUCCION.IMPRIMIR,
            expresion: expresion
        }
    },
    nuevoWhile: function (condicion, instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.WHILE,
            condidicion: condicion,
            instrucciones: instrucciones
        }
    },
    nuevoIf: function (condicion, instVerdadero, instFalso){
        return{
            tipo: TIPO_INSTRUCCION.IF,
            condicion: condicion,
            instVerdadero: instVerdadero,
            instFalso: instFalso
        }
    }
}

module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.INSTRUCCION = INSTRUCCION;