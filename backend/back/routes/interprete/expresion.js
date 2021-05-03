const tipoInstruccion = require('../arbol/instrucciones').TIPO_INSTRUCCION;
const tipoOperacion = require('../arbol/instrucciones').TIPO_OPERACION;
const tipoValor = require('../arbol/instrucciones').TIPO_VALOR;
const tipoDato = require('../arbol/tablasimbolos').TIPO_DATO;
const TablaS = require('../arbol/tablasimbolos').TablaS;


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
                return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor + valorDer.valor };
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
        else if(valorIzq.tipo === tipoDato.ENTERO || valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO || valorDer.tipo === tipoDato.DOUBLE){
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
        if(valorIzq.tipo === tipoDato.ENTERO || valorIzq.tipo === tipoDato.DOUBLE){
            if(valorDer.tipo === tipoDato.ENTERO || valorDer.tipo === tipoDato.DOUBLE){
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
    else if(expresion.tipo === tipoOperacion.ADICION){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        if(valorIzq.tipo === tipoDato.ENTERO){
            return { tipo:tipoDato.ENTERO, valor: valorIzq.valor+1 };
        }
        else if(valorIzq.tipo === tipoDato.DOUBLE){
            return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor+1 };
        }
        else {
            console.log('Error semantico de ++');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.SUSTRACCION){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        if(valorIzq.tipo === tipoDato.ENTERO){
            return { tipo:tipoDato.ENTERO, valor: valorIzq.valor-1 };
        }
        else if(valorIzq.tipo === tipoDato.DOUBLE){
            return { tipo:tipoDato.DOUBLE, valor: valorIzq.valor-1 };
        }
        else {
            console.log('Error semantico de ++');
            return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.IGUALDAD){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.ENTERO:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.DOUBLE:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.CHAR:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.BOOL:
                switch(valorDer.tipo) {
                    case tipoDato.BOOL:
                        return {tipo: tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer)};
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.STRING:
                switch(valorDer.tipo){
                    case tipoDato.STRING:
                        return {tipo:tipoDato.BOOL, valor: comparar("===", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.DIFERENTE){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.ENTERO:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.DOUBLE:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.CHAR:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.BOOL:
                switch(valorDer.tipo){
                    case tipoDato.BOOL:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.STRING:
                switch(valorDer.tipo){
                    case tipoDato.STRING:
                        return {tipo:tipoDato.BOOL, valor: comparar("!==", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.MENOR){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.ENTERO:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.DOUBLE:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.CHAR:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("<", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.MENORIGUAL){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.ENTERO:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.DOUBLE:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.CHAR:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar("<=", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.MAYOR){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.ENTERO:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.DOUBLE:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.CHAR:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar(">", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.MAYORIGUAL){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.ENTERO:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.DOUBLE:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            case tipoDato.CHAR:
                switch(valorDer.tipo){
                    case tipoDato.ENTERO:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    case tipoDato.DOUBLE:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    case tipoDato.CHAR:
                        return {tipo:tipoDato.BOOL, valor: comparar(">=", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.AND){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.BOOL:
                switch(valorDer.tipo){
                    case tipoDato.BOOL:
                        return {tipo:tipoDato.BOOL, valor: comparar("&&", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.OR){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        let valorDer = procesarexpresion(expresion.operandoDer, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.BOOL:
                switch(valorDer.tipo){
                    case tipoDato.BOOL:
                        return {tipo:tipoDato.BOOL, valor: comparar("||", valorIzq, valorDer) };
                    default:
                        console.log("ERROR de tipos");
                        return undefined;
                }
            default:
                console.log("ERROR de tipos");
                return undefined;
        }
    }
    else if(expresion.tipo === tipoOperacion.NOT){
        let valorIzq = procesarexpresion(expresion.operandoIzq, tsglobal, tslocal);
        switch(valorIzq.tipo){
            case tipoDato.BOOL:
                return { tipo:tipoDato.BOOL, valor:!valorIzq.valor };
            default:
                console.log("ERROR de tipos");
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
        let valor = expresion.valor.replace(/\\n/g, "\n");
        valor = valor.replace(/\\t/g, "\t");
        valor = valor.replace(/\\r/g, "\r");
        valor = valor.replace(/\\'/g, "\'");
        valor = valor.replace(/\\"/g, "\"");
        return { tipo:tipoDato.STRING, valor: valor }
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

function comparar(tipo, valora, valorb){
    let valor1;
    if (valora.tipo === tipoDato.CHAR) {
        valor1 = valora.valor.charCodeAt(0);
    } else {
        valor1 = valora.valor;
    }
    let valor2;
    if (valorb.tipo === tipoDato.CHAR) {
        valor2 = valorb.valor.charCodeAt(0);
    } else {
        valor2 = valorb.valor;
    }
    console.log(tipo, valor1, valor2);
    switch (tipo){
        case "<":
            return valor1 < valor2;
        case ">":
            return valor1 > valor2;
        case "<=":
            return valor1 <= valor2;
        case ">=":
            return valor1 >= valor2;
        case "===":
            return valor1 === valor2;
        case "!==":
            return valor1 !== valor2;
        case "&&":
            return valor1 && valor2;
        case "||":
            return valor1 || valor2;
    }
}

module.exports.procesarexpresion = procesarexpresion;