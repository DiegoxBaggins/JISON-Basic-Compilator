const TIPO_DATO = {
    ENTERO:         'VAL_ENTERO',
    DOUBLE:         'VAL_DOUBLE',
    CHAR:           'VAL_CHAR',
    STRING:         'VAL_STRING',
    BOOL:           'VAL_BOOL',
    VECTOR:         'VAL_VECTOR',
    LISTA:          'VAL_LISTA'
}

function crearSimbolo(tipo, tipo2, id, valor, linea, columna, ambito){
    return {
        tipo: tipo,
        tipo2: tipo2,
        id: id,
        valor: valor,
        linea: linea,
        columna: columna,
        ambito: ambito
    }
}

class TablaS {
    constructor(simbolos) {
        this._simbolos = [];
        this._simbolos = this._simbolos.concat(simbolos);
    }

    agregar(tipo, tipo2, id, valor, linea, columna, ambito){
        let simbolo = this.obtener(id);
        if(simbolo !== undefined){
            console.log("simbolo ya existe")
        }else{
            let valorr = {tipo: tipo, valor: valor.valor }
            let valorNuevo = comprobarCasteos(valorr, valor);
            if(valorNuevo !== undefined){
                this._simbolos.push(crearSimbolo(tipo, tipo2, id, valor.valor, linea, columna, ambito));
                console.log("simbolo registrado con exito");
            }else{
                console.log('error semantico');
            }
        }
    }

    obtener(id){
        return this._simbolos.filter((simbolo) => simbolo.id === id)[0];
    }

    modificar(id, valor){
        let valorr = this._simbolos.filter((simbolo) => simbolo.id === id)[0];
        if (valorr === undefined){
            console.log('error no existe la variable')
        }else{
            //console.log(valorr);
            //console.log(valor);
            let valorNuevo = comprobarCasteos(valorr, valor);
            if(valorNuevo !== undefined){
                this._simbolos.filter((simbolo) => simbolo.id === id)[0].valor = valorNuevo;
            }
            else{
                console.log("Los tipos no coinciden");
            }
        }
    }

    agregarParametros(parametros, expresiones, linea, columna, ambito){
        console.log(parametros, expresiones);
        let indice= 0;
        parametros.forEach((parametro)=>{
            let expresion = expresiones[indice];
            let valorr = this.obtener(parametro.id);
            if(valorr){
                this.modificar(parametro.id, expresion);
            }else{
                this.agregar(parametro.tipo, undefined, parametro.id, expresion, linea, columna, ambito);
            }
            indice = indice + 1;
        });
    }

    get simbolos(){
        return this._simbolos;
    }

    agregarGeneral(valor){
        let valorr = this._simbolos.filter((simbolo) => simbolo.id === valor.id)[0];
        if (valorr === undefined){
            this._simbolos.push(valor);
        }else{
            if( valor.linea === valorr.linea && valor.columna === valorr.columna){
                console.log('error la variable ya existe');
            }
            else{
                this._simbolos.push(valor);
            }
        }
    }
}

function comprobarCasteos(exp1, exp2){
    switch(exp1.tipo){
        case TIPO_DATO.ENTERO:
            switch(exp2.tipo){
                case TIPO_DATO.ENTERO:
                    return exp2.valor;
                case TIPO_DATO.BOOL:
                    if(exp2.valor){
                        return 1;
                    }else{
                        return 0;
                    }
                case TIPO_DATO.CHAR:
                    return exp2.valor.charCodeAt(0);
                default:
                    console.log("ERROR de tipos");
                    return undefined;
            }
        case TIPO_DATO.DOUBLE:
            switch(exp2.tipo){
                case TIPO_DATO.ENTERO:
                    return exp2.valor + 0.0;
                case TIPO_DATO.DOUBLE:
                    return exp2.valor;
                case TIPO_DATO.CHAR:
                    return exp2.valor.charCodeAt(0);
                case TIPO_DATO.BOOL:
                    if(exp2.valor){
                        return 1;
                    }else{
                        return 0;
                    }
                default:
                    console.log("ERROR de tipos");
                    return undefined;
            }
        case TIPO_DATO.CHAR:
            switch(exp2.tipo){
                case TIPO_DATO.CHAR:
                    return exp2.valor;
                default:
                    console.log("ERROR de tipos");
                    return undefined;
            }
        case TIPO_DATO.BOOL:
            switch(exp2.tipo) {
                case TIPO_DATO.BOOL:
                    return exp2.valor;
                case TIPO_DATO.ENTERO || TIPO_DATO.DOUBLE:
                    if (exp2.valor === 1){
                        return true;
                    }else if(exp2.valor === 0){
                        return false;
                    }else{
                        console.log("ERROR de tipos");
                        return undefined;
                    }
                default:
                    console.log("ERROR de tipos");
                    return undefined;
            }
        case TIPO_DATO.STRING:
            switch(exp2.tipo){
                case TIPO_DATO.STRING || TIPO_DATO.CHAR:
                    return exp2.valor;
                default:
                    console.log("ERROR de tipos");
                    return undefined;
            }
        default:
            console.log("ERROR de tipos");
            return undefined;
    }
}

module.exports.TIPO_DATO = TIPO_DATO;
module.exports.TablaS = TablaS;