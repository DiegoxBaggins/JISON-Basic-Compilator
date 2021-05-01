
const TIPO_VALOR = {
    ENTERO:         'VAL_ENTERO',
    DOUBLE:         'VAL_DOUBLE',
    BOOL:           'VAL_BOOL',
    CHAR:           'VAL_CHAR',
    STRING:         'VAL_STRING',
    IDENTIFICADOR:  'VAL_IDENTIFICADOR',
    VOID:           'VAL_VOID',
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
    BLOQUEIF:           'INSTR_BLOQUEIF',
    IF:                 'INSTR_IF',
    ELSE:               'INSTR_ELSE',
    ASIGNACION:         'INSTR_ASIGNACION',
    DOWHILE:            'INSTR_DOWHILE',
    FOR:                'INSTR_FOR',
    SWTICH:             'INSTR_SWITCH',
    CASE:               'INSTR_CASE',
    DEFAULT:            'INSTR_DEFAULT',
    METODO:             'INSTR_METODO',
    FUNCION:            'INSTR_FUNCION',
    EXEC:               'INSTR_EXEC',
    LLAMADA:            'INSTR_LLAMADA',
    BREAK:              'INSTR_BREAK',
    TERNARIO:           'INSTR_TERNARIO',
    EXC:                'INSTR_EXC'
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
    nuevaDeclaracion: function (tipo, tipo2, id, expresion, linea, columna){
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION,
            tipo_dato1: tipo,
            tipo_dato2: tipo2,
            id: id,
            expresion: expresion,
            linea: linea,
            columna: columna
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
            condicion: condicion,
            instrucciones: instrucciones
        }
    },
    nuevoBloqueIf: function (instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.BLOQUEIF,
            instrucciones: instrucciones
        }
    },
    nuevoIf: function (condicion, instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.IF,
            condicion: condicion,
            instrucciones: instrucciones
        }
    },
    nuevoElse: function (instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.ELSE,
            instrucciones:instrucciones
        }
    },
    nuevoDoWhile: function (condicion, instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.DOWHILE,
            condicion: condicion,
            instrucciones: instrucciones
        }
    },
    nuevoFor: function (asignacion1, condicion, asignacion2, instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.FOR,
            asignacion1: asignacion1,
            condicion: condicion,
            asignacion2: asignacion2,
            instrucciones: instrucciones
        }
    },
    nuevoSwitch: function (condicion, instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.SWTICH,
            condicion: condicion,
            instrucciones: instrucciones
        }
    },
    nuevoCase: function (condicion, instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.CASE,
            condicion: condicion,
            instrucciones: instrucciones
        }
    },
    nuevoDefault: function (instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.DEFAULT,
            instrucciones:instrucciones
        }
    },
    nuevoMetodo: function (identificador, parametros, instrucciones){
        return{
            tipo: TIPO_INSTRUCCION.METODO,
            id: identificador,
            parametros: parametros,
            instrucciones: instrucciones
        }
    },
    nuevoParametro: function (tipo, id){
        return {
            tipo: tipo,
            id: id
        }
    },
    nuevaLlamada: function (id, expresiones, linea, columna){
        return {
            tipo: TIPO_INSTRUCCION.LLAMADA,
            id: id,
            expresiones: expresiones,
            linea: linea,
            columna: columna
        }
    },
    nuevoExc: function (llamada){
        return {
            tipo: TIPO_INSTRUCCION.EXC,
            metodo: llamada
        }
    }
}

module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.INSTRUCCION = INSTRUCCION;