
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
    ADICION:            'INSTR_ADICION',
    SUSTRACCION:        'INSTR_SUSTRACCION',
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
    CONTINUE:           'INSTR_CONTINUE',
    TERNARIO:           'INSTR_TERNARIO',
    EXC:                'INSTR_EXC',
    ERROR:              'INSTR_ERROR',
    RETURN:             'INSTR_RETURN',
    LOWER:              'INSTR_LOWER',
    UPPER:              'INSTR_UPPER',
    LENG:               'INSTR_LENGHT',
    TRUNC:              'INSTR_TRUNC',
    INROUND:            'INSTR_ROUND',
    TYPE:               'INSTR_TYPEOF',
    TOSTRING:           'INSTR_TOSTR'
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
    nuevaAdicion: function (id){
        return {
            tipo: TIPO_INSTRUCCION.ADICION,
            id: id
        }
    },
    nuevaSustraccion: function (id){
        return {
            tipo: TIPO_INSTRUCCION.SUSTRACCION,
            id: id
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
    nuevoMetodo: function (identificador, parametros, instrucciones, linea, columna){
        return{
            tipo: TIPO_INSTRUCCION.METODO,
            id: identificador,
            parametros: parametros,
            instrucciones: instrucciones,
            linea: linea,
            columna: columna
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
    },
    nuevoBreak: function (){
        return {
            tipo: TIPO_INSTRUCCION.BREAK,
        }
    },
    nuevoContinue: function (){
        return {
            tipo: TIPO_INSTRUCCION.CONTINUE,
        }
    },
    nuevoReturn: function (exp){
        return {
            tipo: TIPO_INSTRUCCION.RETURN,
            exp: exp
        }
    },
    nuevoError: function (tipo, descripcion, linea, columna){
        return {
            tipo: TIPO_INSTRUCCION.ERROR,
            tipoError: tipo,
            descripcion: descripcion,
            linea: linea,
            columna: columna
        }
    },
    nuevaFuncion: function (tipoDato, identificador, parametros, instrucciones, linea, columna){
        return{
            tipo: TIPO_INSTRUCCION.FUNCION,
            tipoDato: tipoDato,
            id: identificador,
            parametros: parametros,
            instrucciones: instrucciones,
            linea: linea,
            columna: columna
        }
    },
    nuevoLower: function (exp){
        return{
            tipo: TIPO_INSTRUCCION.LOWER,
            expresion: exp
        }
    },
    nuevoUpper: function (exp){
        return{
            tipo: TIPO_INSTRUCCION.UPPER,
            expresion: exp
        }
    },
    nuevoLen: function (exp){
        return{
            tipo: TIPO_INSTRUCCION.LENG,
            expresion: exp
        }
    },
    nuevoTrun: function (exp){
        return{
            tipo: TIPO_INSTRUCCION.TRUNC,
            expresion: exp
        }
    },
    nuevoRound: function (exp){
        return{
            tipo: TIPO_INSTRUCCION.INROUND,
            expresion: exp
        }
    },
    nuevoType: function (exp){
        return{
            tipo: TIPO_INSTRUCCION.TYPE,
            expresion: exp
        }
    },
    nuevoTostr: function (exp) {
        return {
            tipo: TIPO_INSTRUCCION.TOSTRING,
            expresion: exp
        }
    },
    nuevoTer: function (condicion, exp1, exp2){
        return {
            tipo: TIPO_INSTRUCCION.TERNARIO,
            condicion: condicion,
            exp1: exp1,
            exp2: exp2
        }
    }
}

module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.INSTRUCCION = INSTRUCCION;