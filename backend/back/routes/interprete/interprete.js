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
        else if(instruccion.tipo === tipoInstruccion.WHILE){
            ejecutarwhile(instruccion, tsglobal, tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.BLOQUEIF){
            ejecutarif(instruccion, tsglobal, tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.DOWHILE){
            ejecutarDowhile(instruccion, tsglobal, tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.FOR){
            ejecutarfor(instruccion, tsglobal, tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.SWTICH){
            ejecutarSwitch(instruccion, tsglobal, tslocal);
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
            tslocal.modificar(instruccion.id, valor);
        }
        else{
            tsglobal.modificar(instruccion.id, valor);
        }
    }
    else {
        tsglobal.modificar(instruccion.id, valor);
    }
}

function ejecutarimprimir(instruccion, tsglobal, tslocal){
    console.log("soy impresion");
    let valor = procesarexpresion(instruccion.expresion, tsglobal , tslocal);
    console.log(valor);
    salida += valor.valor +'\n';
}

function ejecutarwhile(instruccion, tsglobal, tslocal){
    console.log("soy while");
    console.log(instruccion.condicion);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    while (valor.valor){
        ejecutarbloqueglobal(instruccion.instrucciones, tsglobal, tslocal);
        valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    }
}

function ejecutarif(instruccion1, tsglobal, tslocal){
    console.log("soy un if");
    let instrucciones = instruccion1.instrucciones;
    instrucciones.every((instruccion)=>{
        if (instruccion.tipo === tipoInstruccion.IF){
            console.log("soy un if o if else");
            let valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
            if (valor.valor) {
                ejecutarbloqueglobal(instruccion.instrucciones, tsglobal, tslocal);
                return false;
            }else{
                return true;
            }
        }else if (instruccion.tipo === tipoInstruccion.ELSE){
            console.log("soy un else");
            ejecutarbloqueglobal(instruccion.instrucciones, tsglobal, tslocal);
            return false;
        }
    });
}

function ejecutarDowhile(instruccion, tsglobal, tslocal){
    console.log("soy do while");
    console.log(instruccion.condicion);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    do{
        ejecutarbloqueglobal(instruccion.instrucciones, tsglobal, tslocal);
        valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    }while (valor.valor);
}

function ejecutarfor(instruccion, tsglobal, tslocal){
    console.log("soy for");
    let asig = [instruccion.asignacion1];
    ejecutarbloqueglobal(asig, tsglobal, tslocal);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    while (valor.valor){
        ejecutarbloqueglobal(instruccion.instrucciones, tsglobal, tslocal);
        ejecutarAsignacion(instruccion.asignacion2, tsglobal, tslocal);
        valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    }
}

function ejecutarSwitch(instruccion1, tsglobal, tslocal){
    console.log("soy un switch");
    let instrucciones = instruccion1.instrucciones;
    let condicionGeneral = instruccion1.condicion;
    instrucciones.every((instruccion)=>{
        if (instruccion.tipo === tipoInstruccion.CASE){
            console.log("soy Case");
            let expresion = {
                tipo: tipoOperacion.IGUALDAD,
                operandoIzq: condicionGeneral,
                operandoDer: instruccion.condicion
            };
            console.log(expresion);
            let valor = procesarexpresion(expresion, tsglobal, tslocal);
            if (valor.valor) {
                ejecutarbloqueglobal(instruccion.instrucciones, tsglobal, tslocal);
                return false;
            }else{
                return true;
            }
        }else if (instruccion.tipo === tipoInstruccion.DEFAULT){
            console.log("soy un default");
            ejecutarbloqueglobal(instruccion.instrucciones, tsglobal, tslocal);
            return false;
        }
    });
}

module.exports.ejecutar = ejecutar;