const tipoInstruccion = require('../arbol/instrucciones').TIPO_INSTRUCCION;
const tipoOperacion = require('../arbol/instrucciones').TIPO_OPERACION;
const tipoValor = require('../arbol/instrucciones').TIPO_VALOR;
const tipoDato = require('../arbol/tablasimbolos').TIPO_DATO;
const TablaS = require('../arbol/tablasimbolos').TablaS;
const procesarexpresion = require('../interprete/expresion').procesarexpresion;
const instruccionArbol = require('../arbol/instrucciones').INSTRUCCION;

let salida = '';
let metodos = [];
let ambito = "global";
let funcionActual = false;
let tablaGeneral = new TablaS([]);
let errores = [];
function ejecutar(arbol, errors){
    errores = errors;
    salida = "";
    metodos = [];
    funcionActual = false;
    let tslocal = new TablaS([]);
    let tablaGlobal = new TablaS([]);
    let main = [];
    ambito = "global";
    tablaGeneral = new TablaS([]);
    ejecutarbloqueglobal(arbol, tablaGlobal, tslocal, metodos, main);
    tablaGeneral.agregarMetodos(metodos);
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
                    let proc = procesarexpresion(expresion, tablaGlobal, tslocal);
                    if(proc.tipo === tipoInstruccion.ERROR){
                        errores.push(proc);
                    }else{
                        nuevoExpresiones[indice] = proc;
                    }
                    nuevoParametro[indice] = metodoExec.parametros[indice];
                    indice += 1;
                });
                errores.concat(tslocal2.agregarParametros(nuevoParametro, nuevoExpresiones, llamada.linea, llamada.columna, ambito));
                guardarParametrosG(tslocal2, nuevoParametro);
                ambito = "metodo " + llamada.id;
                ejecutarbloquelocal(metodoExec.instrucciones, tablaGlobal, tslocal2);
                //console.log(tablaGeneral);
            }else{
                console.log("No vienen correcto el numero de parametros");
                errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: El numero de parametros en la llamada no corresponde en Exec", undefined, undefined));
                //errores.push("Error semantico: El numero de parametros en la llamada no corresponde en Exec");
            }
        }else{
            console.log("no hay main");
            errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: No se encontro ningun metodo con el id: " + llamada.id, undefined, undefined));
            //errores.push("Error semantico: No se encontro ningun metodo con el id: " + llamada.id);
        }
    }else{
        console.log("mas de un main");
        errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: Se econtro 0 o mas de 2 metodos Exec", undefined, undefined));
        //errores.push("Error semantico: Se econtro 0 o mas de 2 metodos Exec");
    }
    salida += construirError();
    return [salida, tablaGeneral._simbolos, construirErrores()];
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
    let rtr = undefined;
    instrucciones.every((instruccion)=>{
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
        else if(instruccion.tipo === tipoInstruccion.ADICION){
            ejecutarAdicion(instruccion, tsglobal,tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.SUSTRACCION){
            ejecutarSustraccion(instruccion, tsglobal,tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.WHILE){
            let tslocal2 = new TablaS(tslocal._simbolos);
            rtr = ejecutarwhile(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.BLOQUEIF){
            let tslocal2 = new TablaS(tslocal._simbolos);
            rtr = ejecutarif(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.DOWHILE){
            let tslocal2 = new TablaS(tslocal._simbolos);
            rtr = ejecutarDowhile(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.FOR){
            let tslocal2 = new TablaS(tslocal._simbolos);
            rtr = ejecutarfor(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.SWTICH){
            let tslocal2 = new TablaS(tslocal._simbolos);
            rtr = ejecutarSwitch(instruccion, tsglobal, tslocal2);
        }
        else if(instruccion.tipo === tipoInstruccion.LLAMADA){
            ejecutarLlamado(instruccion, tsglobal, tslocal);
        }
        else if(instruccion.tipo === tipoInstruccion.BREAK){
            rtr = tipoInstruccion.BREAK;
        }
        else if(instruccion.tipo === tipoInstruccion.CONTINUE){
            rtr = tipoInstruccion.CONTINUE;
        }
        else if(instruccion.tipo === tipoInstruccion.RETURN){
            if(instruccion.exp === undefined){
                rtr = tipoInstruccion.BREAK;
            }else{
                rtr = procesarexpresion(instruccion.exp, tsglobal, tslocal);
            }
        }
        if(rtr !== undefined){
            return false;
        }else{
            return true;
        }
    });
    return rtr;
}

function ejecutardeclaracionglobal(instruccion, tsglobal, tslocal){
    //console.log(instruccion.expresion);
    if (instruccion.expresion === undefined){
        console.log("soy undefined");
        switch(instruccion.tipo_dato1){
            case tipoDato.ENTERO:
                errores.push(tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.DOUBLE:
                errores.push(tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0.0}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.BOOL:
                errores.push(tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:true}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.CHAR:
                errores.push(tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.STRING:
                errores.push(tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito));
                break;
        }
    }else{
        let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
        if(valor.tipo === tipoInstruccion.ERROR){
            errores.push(valor);
        }else{
            errores.push(tsglobal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , valor, instruccion.linea, instruccion.columna, ambito));
        }
        //console.log(tsglobal);
    }
    guardarVariables(tsglobal, instruccion.id);
}

function ejecutarAsignacionglobal(instruccion, tsglobal, tslocal){
    //console.log(instruccion.expresion);
    let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
    if(valor.tipo === tipoInstruccion.ERROR){
        errores.push(valor);
    }else{
        errores.push(tsglobal.modificar(instruccion.id, valor));
    }
}

function ejecutardeclaracion(instruccion, tsglobal, tslocal){
    //console.log(instruccion.expresion);
    if (instruccion.expresion === undefined){
        console.log("soy undefined");
        switch(instruccion.tipo_dato1){
            case tipoDato.ENTERO:
                errores.push(tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.DOUBLE:
                errores.push(tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:0.0}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.BOOL:
                errores.push(tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:true}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.CHAR:
                errores.push(tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito));
                break;
            case tipoDato.STRING:
                errores.push(tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , {tipo:instruccion.tipo_dato1, valor:""}, instruccion.linea, instruccion.columna, ambito));
                break;
        }
    }else{
        let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
        if(valor.tipo === tipoInstruccion.ERROR){
            errores.push(valor);
        }else{
            errores.push(tslocal.agregar(instruccion.tipo_dato1 ,instruccion.tipo_dato2 , instruccion.id , valor, instruccion.linea, instruccion.columna, ambito));
        }
       //console.log(tsglobal);
    }
    guardarVariables(tslocal, instruccion.id);
}

function ejecutarAsignacion(instruccion, tsglobal, tslocal){
    console.log("spy asignacion");
    //console.log(instruccion.expresion);
    let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
    if(valor.tipo === tipoInstruccion.ERROR){
        errores.push(valor);
    }else{
        if(tslocal !== undefined){
            let valorr = tslocal.obtener(instruccion.id);
            if(valorr){
                errores.push(tslocal.modificar(instruccion.id, valor));
            }
            else{
                errores.push(tsglobal.modificar(instruccion.id, valor));
            }
        }
        else {
            errores.push(tsglobal.modificar(instruccion.id, valor));
        }
    }
}

function ejecutarAdicion(instruccion, tsglobal, tslocal){
    console.log("soy adicion");
    //console.log(instruccion.expresion);
    if(tslocal !== undefined){
        let valorr = tslocal.obtener(instruccion.id);
        if(valorr){
            errores.push(tslocal.adicion(instruccion.id));
        }
        else{
            errores.push(tsglobal.adicion(instruccion.id));
        }
    }
    else {
        errores.push(tsglobal.adicion(instruccion.id));
    }
}

function ejecutarSustraccion(instruccion, tsglobal, tslocal){
    console.log("soy sustraccion");
    //console.log(instruccion.expresion);
    if(tslocal !== undefined){
        let valorr = tslocal.obtener(instruccion.id);
        if(valorr){
            errores.push(tslocal.sustraccion(instruccion.id));
        }
        else{
            errores.push(tsglobal.sustraccion(instruccion.id));
        }
    }
    else {
        errores.push(tsglobal.sustraccion(instruccion.id));
    }
}

function ejecutarimprimir(instruccion, tsglobal, tslocal){
    console.log("soy impresion");
    let valor = procesarexpresion(instruccion.expresion, tsglobal ,tslocal);
    if(valor.tipo === tipoInstruccion.ERROR){
        errores.push(valor);
    }else {
        //console.log(valor);
        salida += valor.valor + '\n';
    }
}

function ejecutarwhile(instruccion, tsglobal, tslocal){
    ambito = "While";
    console.log("soy while");
    //console.log(instruccion.condicion);
    let rtr = undefined;
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    if(valor.tipo === tipoInstruccion.ERROR){
        errores.push(valor);
    }else {
        while (valor.valor) {
            rtr = ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
            if(rtr === undefined || rtr === tipoInstruccion.CONTINUE){
                valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
            }else if(rtr === tipoInstruccion.BREAK){
                rtr = undefined;
                valor.valor = false;
            }else{
                if(funcionActual === false){
                    errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: Return con expresion fuera de una funcion", undefined, undefined));
                }else{
                    valor.valor = false;
                }
            }
        }
    }
    return rtr;
}

function ejecutarif(instruccion1, tsglobal, tslocal){
    ambito = "If";
    console.log("soy un if");
    let instrucciones = instruccion1.instrucciones;
    let rtr = undefined;
    instrucciones.every((instruccion)=>{
        if (instruccion.tipo === tipoInstruccion.IF){
            console.log("soy un if o if else");
            let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
            if(valor.tipo === tipoInstruccion.ERROR){
                errores.push(valor);
                return true;
            }else {
                if (valor.valor) {
                    rtr = ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
                    return false;
                } else {
                    return true;
                }
            }
        }else if (instruccion.tipo === tipoInstruccion.ELSE){
            console.log("soy un else");
            rtr = ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
            return false;
        }
    });
    return rtr;
}

function ejecutarDowhile(instruccion, tsglobal, tslocal){
    ambito = "Do-while";
    console.log("soy do while");
    let rtr = undefined;
    //console.log(instruccion.condicion);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    if(valor.tipo === tipoInstruccion.ERROR){
        errores.push(valor);
    }else {
        do {
            rtr = ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
            if(rtr === undefined || rtr === tipoInstruccion.CONTINUE){
                valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
            }else if(rtr === tipoInstruccion.BREAK){
                rtr = undefined;
                valor.valor = false;
            }else{
                if(funcionActual === false){
                    errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: Return con expresion fuera de una funcion", undefined, undefined));
                }else{
                    valor.valor = false;
                }
            }
        } while (valor.valor);
    }
    return rtr;
}

function ejecutarfor(instruccion, tsglobal, tslocal){
    ambito = "for";
    console.log("soy for");
    let rtr = undefined;
    let asig = [instruccion.asignacion1];
    ejecutarbloquelocal(asig, tsglobal, tslocal);
    let valor = procesarexpresion(instruccion.condicion, tsglobal ,tslocal);
    if(valor.tipo === tipoInstruccion.ERROR){
        errores.push(valor);
    }else {
        while (valor.valor) {
            rtr = ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
            ejecutarbloquelocal([instruccion.asignacion2], tsglobal, tslocal);
            //ejecutarAsignacion(instruccion.asignacion2, tsglobal, tslocal);
            valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
            if(rtr === undefined || rtr === tipoInstruccion.CONTINUE){
                valor = procesarexpresion(instruccion.condicion, tsglobal, tslocal);
            }else if(rtr === tipoInstruccion.BREAK){
                rtr = undefined;
                valor.valor = false;
            }else{
                if(funcionActual === false){
                    errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: Return con expresion fuera de una funcion", undefined, undefined));
                }else{
                    valor.valor = false;
                }
            }
        }
    }
    return rtr;
}

function ejecutarSwitch(instruccion1, tsglobal, tslocal){
    ambito = "Switch";
    console.log("soy un switch");
    let rtr = undefined;
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
            let valor = procesarexpresion(expresion, tsglobal ,tslocal);
            if(valor.tipo === tipoInstruccion.ERROR){
                errores.push(valor);
                return true;
            }else {
                if (valor.valor) {
                    rtr = ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
                    if(rtr === undefined || rtr === tipoInstruccion.CONTINUE){
                        return true;
                    }else if(rtr === tipoInstruccion.BREAK){
                        rtr = undefined;
                        return false;
                    }else{
                        if(funcionActual === false){
                            errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: Return con expresion fuera de una funcion", undefined, undefined));
                        }else{
                            return false;
                        }
                    }
                } else {
                    return true;
                }
            }
        }else if (instruccion.tipo === tipoInstruccion.DEFAULT){
            console.log("soy un default");
            ejecutarbloquelocal(instruccion.instrucciones, tsglobal, tslocal);
            return false;
        }
    });
    return rtr;
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
                let proc = procesarexpresion(expresion, tsglobal, tslocal);
                if(proc.tipo === tipoInstruccion.ERROR){
                    errores.push(proc);
                }else{
                    nuevoExpresiones[indice] = proc;
                }
                nuevoParametro[indice] = metodo.parametros[indice];
                indice += 1;
            });
            let tslocal2 = new TablaS([]);
            errores.concat(tslocal2.agregarParametros(nuevoParametro, nuevoExpresiones, instruccion.linea, instruccion.columna, ambito));
            guardarParametrosG(tslocal2, nuevoParametro);
            //console.log(tslocal2);
            ambito = "metodo " + metodo.id;
            ejecutarbloquelocal(metodo.instrucciones, tsglobal, tslocal2, instruccion.linea, instruccion.columna, ambito);
        }else{
            console.log("No vienen correcto el numero de parametros");
            errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: El numero de parametros en la llamada no corresponde en " + metodo.id, undefined, undefined));
            //errores.push("Error semantico: El numero de parametros en la llamada no corresponde en " + metodo.id);
        }
    }else{
        console.log("no existe este metodo");
        errores.push(instruccionArbol.nuevoError("Semantico","Error semantico: El metodo " + instruccion.id + " No existe", undefined, undefined));
        //errores.push("Error semantico: El metodo " + instruccion.id + " No existe");
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

function construirError(){
    let str = "";
    console.log(errores);
    errores.forEach((error) => {
        if(error !== undefined){
            str += error.descripcion + "\n";
        }
    });
    return str;
}

function construirErrores(){
    let str = [];
    console.log(errores);
    errores.forEach((error) => {
        if(error !== undefined){
            str.push(error);
        }
    });
    return str;
}

module.exports.ejecutar = ejecutar;