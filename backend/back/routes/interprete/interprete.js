const tipoInstruccion = require('../arbol/instrucciones').TIPO_INSTRUCCION;
const tipoOperacion = require('../arbol/instrucciones').TIPO_OPERACION;
const tipoValor = require('../arbol/instrucciones').TIPO_VALOR;
const tipoDato = require('../arbol/tablasimbolos').TIPO_DATO;
const TablaS = require('../arbol/tablasimbolos').TablaS;
const procesarexpresion = require('../interprete/expresion').procesarexpresion;

let salida = '';
let metodos = [];
let ambito = "global";
let tablaGeneral = new TablaS([]);
function ejecutar(arbol){
    salida = '';
    metodos = [];
    let tslocal = new TablaS([]);
    let tablaGlobal = new TablaS([]);
    let main = [];
    ambito = "global";
    tablaGeneral = new TablaS([]);
    ejecutarbloqueglobal(arbol, tablaGlobal, tslocal, metodos, main);
    //console.log(metodos);
    if(main.length===1){
        let llamada = main[0].metodo;
        let metodoExec = metodos.filter((metodo) => metodo.id === llamada.id)[0];
        if(metodoExec){
            ambito = "parametros Exec - " + llamada.id;
            if(metodoExec.parametros.length === llamada.expresiones.length){
                let tslocal2 = new TablaS(tslocal.simbolos);
                let indice = 0;
                let nuevoExpresiones = [];
                let nuevoParametro = [];
                llamada.expresiones.forEach((expresion) => {
                    nuevoExpresiones[indice] = procesarexpresion(expresion, tablaGlobal, tslocal);
                    nuevoParametro[indice] = metodoExec.parametros[indice];
                    indice += 1;
                });
                tslocal2.agregarParametros(nuevoParametro, nuevoExpresiones, llamada.linea, llamada.columna, ambito);
                guardarParametrosG(tslocal2, nuevoParametro);
                ambito = "metodo " + llamada.id;
                ejecutarbloquelocal(metodoExec.instrucciones, tablaGlobal, tslocal2);
                console.log(tablaGeneral);
            }else{
                console.log("No vienen correcto el numero de parametros");
            }
        }else{
            console.log("no hay main");
        }
    }else{
        console.log("mas de un main");
    }
    return [salida, tablaGeneral._simbolos];
}

function ejecutarbloqueglobal(instrucciones, tsglobal, tslocal, metodos, main){
    instrucciones.forEach((instruccion)=>{
        //console.log(instruccion);
        if(instruccion.tipo === tipoInstruccion.DECLARACION){
            ejecutardeclaracionglobal(instruccion, tsglobal,tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.ASIGNACION){
            ejecutarAsignacionglobal(instruccion, tsglobal,tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.METODO){
            metodos.push(instruccion);
        }
        else if(instruccion.tipo === tipoInstruccion.EXC){
            main.push(instruccion);
        }
    });

}

function ejecutarbloquelocal(instrucciones, tsglobal, tslocal){
    instrucciones.forEach((instruccion)=>{
        //console.log(tslocal, tsglobal);
        //console.log(instruccion);
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
            let tslocal2 = new TablaS(tslocal._simbolos);
            ejecutarwhile(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.BLOQUEIF){
            let tslocal2 = new TablaS(tslocal._simbolos);
            ejecutarif(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.DOWHILE){
            let tslocal2 = new TablaS(tslocal._simbolos);
            ejecutarDowhile(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.FOR){
            let tslocal2 = new TablaS(tslocal._simbolos);
            ejecutarfor(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.SWTICH){
            let tslocal2 = new TablaS(tslocal._simbolos);
            ejecutarSwitch(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.LLAMADA){
            ejecutarLlamado(instruccion, tsglobal, tslocal);
        }
    });
}

function ejecutardeclaracionglobal(instruccion, tsglobal, tslocal){
    //console.log(instruccion.expresion);
    if (instruccion.expresion === undefined){
        console.log("soy undefined");
        switch(instruccion.tipo_dato1){
            case tipoDato.ENTERO:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.DOUBLE:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0.0}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.BOOL:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:true}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.CHAR:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.STRING:
                tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito);
                break;
        }
    }else{
        let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
        tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , valor, instruccion.linea, instruccion.columna, ambito);
        //console.log(tsglobal);
    }
    guardarVariables(tsglobal, instruccion.id);
}

function ejecutarAsignacionglobal(instruccion, tsglobal, tslocal){
    //console.log(instruccion.expresion);
    let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
    tsglobal.modificar(instruccion.id, valor);
}

function ejecutardeclaracion(instruccion, tsglobal, tslocal){
    //console.log(instruccion.expresion);
    if (instruccion.expresion === undefined){
        console.log("soy undefined");
        switch(instruccion.tipo_dato1){
            case tipoDato.ENTERO:
                tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.DOUBLE:
                tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0.0}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.BOOL:
                tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:true}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.CHAR:
                tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito);
                break;
            case tipoDato.STRING:
                tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito);
                break;
        }
    }else{
        let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
        tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , valor, instruccion.linea, instruccion.columna, ambito);
       //console.log(tsglobal);
    }
    guardarVariables(tslocal, instruccion.id);
}

function ejecutarAsignacion(instruccion, tsglobal, tslocal){
    console.log("spy asignacion");
    //console.log(instruccion.expresion);
    let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
    if(tslocal !== undefined){
        console.log("tengo local");
        let valorr = tslocal.obtener(instruccion.id);
        if(valorr){
            console.log("existo en la local");
            tslocal.modificar(instruccion.id, valor);
        }
        else{
            console.log("tengo local pero no estoy en local");
            tsglobal.modificar(instruccion.id, valor);
        }
    }
    else {
        console.log("soy una global");
        tsglobal.modificar(instruccion.id, valor);
    }
}

function ejecutarimprimir(instruccion, tsglobal, tslocal){
    console.log("soy impresion");
    let valor = procesarexpresion(instruccion.expresion, tsglobal , tslocal);
    //console.log(valor);
    salida += valor.valor +'\n';
}

function ejecutarwhile(instruccion, tsglobal, tslocal){
    ambito = "While";
    console.log("soy while");
    //console.log(instruccion.condicion);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    while (valor.valor){
        ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
        valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    }
}

function ejecutarif(instruccion1, tsglobal, tslocal){
    ambito = "If";
    console.log("soy un if");
    let instrucciones = instruccion1.instrucciones;
    instrucciones.every((instruccion)=>{
        if (instruccion.tipo === tipoInstruccion.IF){
            console.log("soy un if o if else");
            let valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
            if (valor.valor) {
                ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
                return false;
            }else{
                return true;
            }
        }else if (instruccion.tipo === tipoInstruccion.ELSE){
            console.log("soy un else");
            ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
            return false;
        }
    });
}

function ejecutarDowhile(instruccion, tsglobal, tslocal){
    ambito = "Do-while";
    console.log("soy do while");
    //console.log(instruccion.condicion);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    do{
        ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
        valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    }while (valor.valor);
}

function ejecutarfor(instruccion, tsglobal, tslocal){
    ambito = "for";
    console.log("soy for");
    let asig = [instruccion.asignacion1];
    ejecutarbloquelocal(asig, tsglobal, tslocal);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    while (valor.valor){
        ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
        ejecutarAsignacion(instruccion.asignacion2, tsglobal, tslocal);
        valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
    }
}

function ejecutarSwitch(instruccion1, tsglobal, tslocal){
    ambito = "Switch";
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
            //console.log(expresion);
            let valor = procesarexpresion(expresion, tsglobal, tslocal);
            if (valor.valor) {
                ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
                return false;
            }else{
                return true;
            }
        }else if (instruccion.tipo === tipoInstruccion.DEFAULT){
            console.log("soy un default");
            ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
            return false;
        }
    });
}

function ejecutarLlamado(instruccion, tsglobal, tslocal){
    console.log("esto es una llamada");
    let metodo = metodos.filter((metodo) => metodo.id === instruccion.id)[0];
    if(metodo){
        ambito = "parametros - " + metodo.id;
        if(metodo.parametros.length === instruccion.expresiones.length){
            let indice = 0;
            console.log(metodo.parametros, instruccion.expresiones);
            let nuevoExpresiones = [];
            let nuevoParametro = [];
            instruccion.expresiones.forEach((expresion) => {
                nuevoExpresiones[indice] = procesarexpresion(expresion, tsglobal, tslocal);
                nuevoParametro[indice] = metodo.parametros[indice];
                indice += 1;
            });
            let tslocal2 = new TablaS([]);
            tslocal2.agregarParametros(nuevoParametro, nuevoExpresiones, instruccion.linea, instruccion.columna, ambito);
            guardarParametrosG(tslocal2, nuevoParametro);
            //console.log(tslocal2);
            ambito = "metodo " + metodo.id;
            ejecutarbloquelocal(metodo.instrucciones, tsglobal, tslocal2, instruccion.linea, instruccion.columna, ambito);
        }else{
            console.log("No vienen correcto el numero de parametros");
        }
    }else{
        console.log("no existe este metodo");
    }
}

function guardarVariables(ts, id){
    let variable = ts.obtener(id);
    tablaGeneral.agregarGeneral(variable);
    console.log("");
}

function guardarParametrosG(ts, parametros){
    parametros.forEach((parametro) => {
        guardarVariables(ts, parametro.id);
    });
    console.log("");
}

module.exports.ejecutar = ejecutar;