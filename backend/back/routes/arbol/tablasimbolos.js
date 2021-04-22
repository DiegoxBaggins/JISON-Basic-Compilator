const TIPO_DATO = {
    INTEGER:        'VAL_INTEGER',
    DECIMAL:        'VAL_DECIMAL',
    CHAR:           'VAL_CHAR',
    CADENA:         'VAL_CADENA',
    BOOL:           'VAL-BOOL'
}

function crearSimbolo(linea, columna, tipo, tipo2, id, valor){
    return {
        linea: linea,
        columna: columna,
        tipo: tipo,
        tipo2: tipo2,
        id: id,
        valor: valor
    }
}

class TablaS {
    constructor(simbolos) {
        this._simbolos = simbolos;
    }

    agregar(linea, columna, tipo, tipo2, id, valor){
        if(tipo === valor.tipo){

        }else{
            console.log('error semantico');
        }
    }
}