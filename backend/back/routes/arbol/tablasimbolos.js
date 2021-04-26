const TIPO_DATO = {
    ENTERO:         'VAL_ENTERO',
    DOUBLE:         'VAL_DOUBLE',
    CHAR:           'VAL_CHAR',
    STRING:         'VAL_STRING',
    BOOL:           'VAL_BOOL',
    VECTOR:         'VAL_VECTOR',
    LISTA:          'VAL_LISTA'
}

function crearSimbolo(tipo, tipo2, id, valor){
    return {
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

    agregar(tipo, tipo2, id, valor){
        let simbolo = this.obtener(id);
        if(simbolo !== undefined){
            console.log("simbolo ya existe")
        }else{
            if(tipo === valor.tipo){
                this._simbolos.push(crearSimbolo(tipo, tipo2, id, valor.valor))
                console.log("simbolo registrado con exito");
            }else{
                console.log('error semantico');
            }
        }
    }

    obtener(id){
        return this._simbolos.filter((simbolo) => simbolo.id === id)[0];
    }

    get simbolos(){
        return this._simbolos;
    }

}

module.exports.TIPO_DATO = TIPO_DATO;
module.exports.TablaS = TablaS;