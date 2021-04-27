const tipoInstruccion = require('../arbol/instrucciones').TIPO_INSTRUCCION;
const tipoOperacion = require('../arbol/instrucciones').TIPO_OPERACION;
const tipoValor = require('../arbol/instrucciones').TIPO_VALOR;
const tipoDato = require('../arbol/tablasimbolos').TIPO_DATO;
const TablaS = require('../arbol/tablasimbolos').TablaS;
const procesarexpresion = require('../interprete/expresion').procesarexpresion;

let salida = ''
function ejecutar(arbol){
    salida = '';
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
        else if(instruccion.tipo === tipoInstruccion.ASIGNACION){
            ejecutarAsignacion(instruccion, tsglobal,tslocal);
        }
    });
}

function ejecutarwhile(instruccion, tsglobal, tslocal){
    let valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    while (valor.valor){
        ejecutarbloqueglobal(instruccion.cuerpo, tsglobal, tslocal);
        valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    }
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
        let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
        tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , valor);
        console.log(tsglobal);
    }
}

function ejecutarAsignacion(instruccion, tsglobal, tslocal){
    console.log(instruccion.expresion);
        let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
    if(tslocal !== undefined){
        let valorr = tslocal.obtener(instruccion.id);
        if(valorr){
            tslocal.modificar(instruccion.id, instruccion.expresion);
        }
        else{
            tsglobal.modificar(instruccion.id, instruccion.expresion);
        }
    }
    else {
        tsglobal.modificar(instruccion.id, instruccion.expresion);
    }
}

function ejecutarimprimir(instruccion, tsglobal, tslocal){
    console.log("soy impresion");
    let valor = procesarexpresion(instruccion.expresion, tsglobal , tslocal);
    console.log(valor)
    salida += valor.valor +'\n';
}



module.exports.ejecutar = ejecutar;