const tipoInstruccion = require('../arbol/instrucciones').TIPO_INSTRUCCION;
const tipoOperacion = require('../arbol/instrucciones').TIPO_OPERACION;
const tipoValor = require('../arbol/instrucciones').TIPO_VALOR;
const tipoDato = require('../arbol/tablasimbolos').TIPO_DATO;
const TablaS = require('../arbol/tablasimbolos').TablaS;

let salida = ''
function ejecutar(arbol){
    let tablaGlobal = new TablaS([]);
    ejecutarbloqueglobal(arbol, tablaGlobal, undefined);
    return salida;
}

function ejecutarbloqueglobal(instrucciones, tsglobal, tslocal){
    instrucciones.forEach((instruccion)=>{
        console.log(instruccion);
        if(instruccion.tipo === tipoInstruccion.DECLARACION){
            ejecutardeclaracion(instruccion, tsglobal,tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.IMPRIMIR){
            ejecutarimprimir(instruccion, tsglobal,tslocal);
        }
    });
}

function ejecutardeclaracion(instruccion, tsglobal, tslocal){
    console.log(instruccion.expresion);
    if (instruccion.expresion === undefined){
        console.log("soy undefined");
        switch(instruccion.tipo_dato1){
            case tipoDato.ENTERO:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0});
                break;
            case tipoDato.DOUBLE:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0.0});
                break;
            case tipoDato.BOOL:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:true});
                break;
            case tipoDato.CHAR:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""});
                break;
            case tipoDato.STRING:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""});
                break;
        }
    }else{
        let valor = procesarexpresion(instruccion.expresion, tsglobal,tslocal);
        tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , valor);
        console.log(tsglobal)
    }
}

function ejecutarimprimir(instruccion, tsglobal, tslocal){
    console.log("soy impresion");
    let valor = procesarexpresion(instruccion.expresion, tsglobal , tslocal);
    console.log(valor)
    salida += valor.valor +'\n';
}

function procesarexpresion(expresion, tsglobal, tslocal){
    if(expresion.tipo === tipoOperacion.SUMA){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        if(valorIzq.tipo === tipoDato.ENTERO){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor+valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor+valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.BOOL){
                if(valorDer.valor === true){
                    return { tipo:tipoDato.ENTERO, valor: valorIzq.valor+ 1 };
                } else {
                   return {tipo:tipoDato.ENTERO, valor: valorIzq.valor };
                }
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor + valorDer.valor.charCodeAt(0) };
            }
            else if(valorDer.tipo === tipoDato.STRING){
                return { tipo:tipoDato.STRING, valor: String(valorIzq.valor) + valorDer.valor};
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor + valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor+valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.BOOL){
                if(valorDer.valor === true){
                    return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor+ 1 };
                } else {
                    return {tipo:tipoDato.DOUBLE, valor: valorIzq.valor };
                }
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor + valorDer.valor.charCodeAt(0) };
            }
            else if(valorDer.tipo === tipoDato.STRING){
                return { tipo:tipoDato.STRING, valor: String(valorIzq.valor) + valorDer.valor};
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.BOOL){
            if(valorDer.tipo === tipoDato.ENTERO){
                if(valorIzq.valor === true){
                    return { tipo:tipoDato.ENTERO, valor: valorDer.valor + 1 };
                } else {
                    return {tipo:tipoDato.ENTERO, valor: valorDer.valor };
                }
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                if(valorIzq.valor === true){
                    return { tipo:tipoDato.DOUBLE, valor: valorDer.valor + 1 };
                } else {
                    return {tipo:tipoDato.DOUBLE, valor: valorDer.valor };
                }
            }
            else if(valorDer.tipo === tipoDato.STRING){
                return { tipo:tipoDato.STRING, valor: String(valorIzq.valor) + valorDer.valor};
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.CHAR){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor.charCodeAt(0) + valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor.charCodeAt(0) + valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.STRING, valor: valorIzq.valor + valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.STRING){
                return { tipo:tipoDato.STRING, valor: valorIzq.valor + valorDer.valor};
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.STRING){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.STRING, valor: valorIzq.valor + String(valorDer.valor) };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.STRING, valor: valorIzq.valor + String(valorDer.valor) };
            }
            else if(valorDer.tipo === tipoDato.BOOL){
                return { tipo:tipoDato.STRING, valor: valorIzq.valor + String(valorDer.valor) };
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.STRING, valor: valorIzq.valor + valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.STRING){
                return { tipo:tipoDato.STRING, valor: valorIzq.valor + valorDer.valor };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else {
            console.log('Error semantico los tipos no se pueden sumar');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.RESTA){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        if(valorIzq.tipo === tipoDato.ENTERO){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor-valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor-valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.BOOL){
                if(valorDer.valor === true){
                    return { tipo:tipoDato.ENTERO, valor: valorIzq.valor- 1 };
                } else {
                    return {tipo:tipoDato.ENTERO, valor: valorIzq.valor };
                }
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor - valorDer.valor.charCodeAt(0) };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor - valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor - valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.BOOL){
                if(valorDer.valor === true){
                    return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor - 1 };
                } else {
                    return {tipo:tipoDato.DOUBLE, valor: valorIzq.valor };
                }
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor - valorDer.valor.charCodeAt(0) };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.BOOL){
            if(valorDer.tipo === tipoDato.ENTERO){
                if(valorIzq.valor === true){
                    return { tipo:tipoDato.ENTERO, valor: valorDer.valor - 1 };
                } else {
                    return {tipo:tipoDato.ENTERO, valor: valorDer.valor };
                }
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                if(valorIzq.valor === true){
                    return { tipo:tipoDato.DOUBLE, valor: valorDer.valor - 1 };
                } else {
                    return {tipo:tipoDato.DOUBLE, valor: valorDer.valor };
                }
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.CHAR){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor.charCodeAt(0) - valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor.charCodeAt(0) - valorDer.valor };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else {
            console.log('Error semantico los tipos no se pueden sumar');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.MULTIPLICACION){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        if(valorIzq.tipo === tipoDato.ENTERO){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor * valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor * valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor * valorDer.valor.charCodeAt(0) };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor * valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor * valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor * valorDer.valor.charCodeAt(0) };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.CHAR){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor.charCodeAt(0) * valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor.charCodeAt(0) * valorDer.valor };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else {
            console.log('Error semantico los tipos no se pueden sumar');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.DIVISION){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        if(valorDer.valor === 0){
            console.log('No se puede dividir dentro de 0');
            return undefined;
        }
        else if(valorDer.tipo === tipoDato.ENTERO || valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO || valorIzq.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor / valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor / valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.CHAR){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor / valorDer.valor.charCodeAt(0) };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.CHAR){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor.charCodeAt(0) / valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor.charCodeAt(0) / valorDer.valor };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else {
            console.log('Error semantico los tipos no se pueden sumar');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.POTENCIA){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        if(valorIzq.tipo === tipoDato.ENTERO){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.ENTERO, valor: valorIzq.valor ^ valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor ^ valorDer.valor };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else if(valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor ^ valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor ^ valorDer.valor };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else {
            console.log('Error semantico los tipos no se pueden sumar');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.MODULO){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        if(valorDer.tipo === tipoDato.ENTERO || valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO || valorIzq.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor % valorDer.valor };
            }
            else if(valorDer.tipo === tipoDato.DOUBLE){
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor % valorDer.valor };
            }
            else{
                console.log('Error semantico no se pueden sumar');
                return undefined;
            }
        }
        else {
            console.log('Error semantico los tipos no se pueden sumar');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.NEGATIVO){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        if(valorIzq.tipo === tipoDato.ENTERO){
            return { tipo:tipoDato.ENTERO, valor: valorIzq.valor*-1 };
        }
        else if(valorIzq.tipo === tipoDato.DOUBLE){
            return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor*-1 };
        }
        else {
            console.log('Error semantico los tipos no se puede volver negativo');
            return undefined;
        }
    }

    else if(expresion.tipo === tipoValor.ENTERO){
        return { tipo:tipoDato.ENTERO, valor: expresion.valor}
    }
    else if(expresion.tipo === tipoValor.DOUBLE){
        return { tipo:tipoDato.DOUBLE, valor: expresion.valor}
    }
    else if(expresion.tipo === tipoValor.BOOL){
        return { tipo:tipoDato.BOOL, valor: expresion.valor}
    }
    else if(expresion.tipo === tipoValor.CHAR){
        return { tipo:tipoDato.CHAR, valor: expresion.valor}
    }
    else if(expresion.tipo === tipoValor.STRING){
        return { tipo:tipoDato.STRING, valor: expresion.valor}
    }
    else if(expresion.tipo === tipoValor.IDENTIFICADOR){
        if(tslocal !== undefined){
            let valorr = tslocal.obtener(expresion.valor);
            if(valorr){
                return { tipo:valorr.tipo, valor:valorr.valor };
            }
            else{
                valorr = tsglobal.obtener(expresion.valor);
                if(valorr){
                    return { tipo:valorr.tipo, valor:valorr.valor };
                }
                else {
                    return undefined;
                }
            }
        }
        else {
            let valorr = tsglobal.obtener(expresion.valor);
            if(valorr){
                return { tipo:valorr.tipo, valor:valorr.valor };
            }
            else {
                return undefined;
            }
        }
    }
}

module.exports.ejecutar = ejecutar;