const tipoInstruccion = require('./arbol/instrucciones').TIPO_INSTRUCCION;
const tipoOperacion = require('./arbol/instrucciones').TIPO_OPERACION;
const tipoValor = require('./arbol/instrucciones').TIPO_VALOR;
const tipoDato = require('./arbol/tablasimbolos').TIPO_DATO;

var fs = require('fs');

function graficarArbol(arbol){
    let number = 0;
    let str = "digraph G{\n" +
        "rankdir=TB\n" +
        "Nodo0[label=\"Arbol\"]\n";
    let arreglo = ejecutarbloque(arbol, number);
    number = arreglo[0];
    str += arreglo[1];
    str += "}";
    fs.writeFile('./arbol.dot', str,  function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}


function ejecutarbloque(instrucciones, number){
    let str = "";
    let pivote = number;
    instrucciones.forEach((instruccion)=>{
        number += 1;
        if(instruccion.tipo === tipoInstruccion.DECLARACION){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejdeclaracion(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.IMPRIMIR){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejimprimir(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.ASIGNACION){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejasignacion(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.WHILE){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejwhile(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.BLOQUEIF){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejif(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.DOWHILE){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejDowhile(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.FOR){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejfor(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.SWTICH){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejSwitch(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.LLAMADA){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejLlamado(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.EXC){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejExec(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
        else if(instruccion.tipo === tipoInstruccion.METODO){
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejMetodo(instruccion, number);
            number = arreglo[0];
            str += arreglo[1];
        }
    });
    return [number, str];
}

function ejdeclaracion(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + number.toString() + "[label =\"Declaracion";
    if (instruccion.expresion === undefined){
        str += " Indefinida\"]\n";
        number += 1;
        str += "Nodo" + number.toString() + "[label =\"Tipo: ";
        let dato = regresarDato(instruccion.tipo_dato1);
        str += dato;
        str += "\nNodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        number +=1;
        str += "Nodo" + number.toString() + "[label =\"Id: " + instruccion.id + "\"]\n";
        str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    }else{
        str += " Definida\"]\n";
        number += 1;
        str += "Nodo" + number.toString() + "[label =\"Tipo Dato: ";
        let dato = regresarDato(instruccion.tipo_dato1);
        str += dato;
        str += "\nNodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        number +=1;
        str += "Nodo" + number.toString() + "[label =\"Id: " + instruccion.id + "\"]\n";
        str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        number +=1;
        str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        let arreglo = procesarexp(instruccion.expresion, number);
        number = arreglo[0];
        str += arreglo[1];
    }
    return [number, str];
}

function regresarDato(tipo){
    let str ="";
    switch(tipo){
        case tipoDato.ENTERO:
            str += " Int\"]";
            break;
        case tipoDato.DOUBLE:
            str += " Double\"]";
            break;
        case tipoDato.BOOL:
            str += " Boolean\"]";
            break;
        case tipoDato.CHAR:
            str += " Char\"]";
            break;
        case tipoDato.STRING:
            str += " String\"]";
            break;
    }
    return str;
}

function ejasignacion(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + number.toString() + "[label =\"Asignacion\"]\n";
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Id: " + instruccion.id + "\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    number +=1;
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let arreglo = procesarexp(instruccion.expresion, number);
    number = arreglo[0];
    str += arreglo[1];
    return [number, str];
}

function ejimprimir(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + number.toString() + "[label =\"Print\"]\n";
    number += 1;
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let arreglo = procesarexp(instruccion.expresion, number);
    number = arreglo[0];
    str += arreglo[1];
    return [number, str];
}

function ejwhile(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + pivote.toString() + "[label =\"While\"]\n";
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Condicion\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    pivote +=1;
    number += 1;
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let arreglo = procesarexp(instruccion.condicion, number);
    number = arreglo[0];
    str += arreglo[1];
    number += 1;
    pivote -=1;
    str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    arreglo = ejecutarbloque(instruccion.instrucciones, number);
    number = arreglo[0];
    str += arreglo[1];
    return [number, str];
}

function ejif(instruccion1, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + pivote.toString() + "[label =\"Bloque If\"]\n";
    let instrucciones = instruccion1.instrucciones;
    instrucciones.forEach((instruccion)=>{
        number += 1;
        if (instruccion.tipo === tipoInstruccion.IF){
            let pivote2 = number;
            str += "Nodo" + pivote2.toString() + "[label =\"If/ If-Else\"]\n";
            str += "Nodo" + pivote.toString() + "->Nodo" + pivote2.toString() + ";\n";
            number += 1;
            str += "Nodo" + number.toString() + "[label =\"Condicion\"]";
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            number += 1;
            pivote2 +=1;
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = procesarexp(instruccion.condicion, number);
            number = arreglo[0];
            str += arreglo[1];
            number += 1;
            pivote2 -=1;
            str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            arreglo = ejecutarbloque(instruccion.instrucciones, number);
            number = arreglo[0];
            str += arreglo[1];
        }else if (instruccion.tipo === tipoInstruccion.ELSE){
            let pivote2 = number;
            str += "Nodo" + pivote2.toString() + "[label =\"Else\"]\n";
            str += "Nodo" + pivote.toString() + "->Nodo" + pivote2.toString() + ";\n";
            number += 1;
            str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejecutarbloque(instruccion.instrucciones, number);
            number = arreglo[0];
            str += arreglo[1];
        }
    });
    return [number, str];
}

function ejDowhile(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + pivote.toString() + "[label =\"Do-While\"]\n";
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Condicion\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    pivote +=1;
    number += 1;
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let arreglo = procesarexp(instruccion.condicion, number);
    number = arreglo[0];
    str += arreglo[1];
    number += 1;
    pivote -=1;
    str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    arreglo = ejecutarbloque(instruccion.instrucciones, number);
    number = arreglo[0];
    str += arreglo[1];
    return [number, str];
}

function ejfor(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + pivote.toString() + "[label =\"For\"]\n";
    let asig = [instruccion.asignacion1];
    let arreglo = ejecutarbloque(asig, number);
    number = arreglo[0];
    str += arreglo[1];
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Condicion\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let pivote2 = number;
    number += 1;
    str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
    arreglo = procesarexp(instruccion.condicion, number);
    number = arreglo[0];
    str += arreglo[1];
    number += 1;
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    arreglo = ejasignacion(instruccion.asignacion2, number);
    number = arreglo[0];
    str += arreglo[1];
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    arreglo = ejecutarbloque(instruccion.instrucciones, number);
    number = arreglo[0];
    str += arreglo[1];
    return [number, str];
}

function ejSwitch(instruccion1, number){
    let instrucciones = instruccion1.instrucciones;
    let condicionGeneral = instruccion1.condicion;
    let str = "";
    let pivote = number;
    str += "Nodo" + pivote.toString() + "[label =\"Switch\"]\n";
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Condicion\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    pivote +=1;
    number += 1;
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let arreglo = procesarexp(condicionGeneral, number);
    number = arreglo[0];
    str += arreglo[1];
    pivote -=1;
    instrucciones.forEach((instruccion)=>{
        number += 1;
        if (instruccion.tipo === tipoInstruccion.CASE){
            let pivote2 = number;
            str += "Nodo" + pivote2.toString() + "[label =\"Case\"]\n";
            str += "Nodo" + pivote.toString() + "->Nodo" + pivote2.toString() + ";\n";
            number += 1;
            str += "Nodo" + number.toString() + "[label =\"Condicion\"]\n";
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            number += 1;
            pivote2 +=1;
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = procesarexp(instruccion.condicion, number);
            number = arreglo[0];
            str += arreglo[1];
            number += 1;
            pivote2 -=1;
            str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            arreglo = ejecutarbloque(instruccion.instrucciones, number);
            number = arreglo[0];
            str += arreglo[1];
        }else if (instruccion.tipo === tipoInstruccion.DEFAULT){
            let pivote2 = number;
            str += "Nodo" + pivote2.toString() + "[label =\"Default\"]\n";
            str += "Nodo" + pivote.toString() + "->Nodo" + pivote2.toString() + ";\n";
            number += 1;
            str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
            str += "Nodo" + pivote2.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = ejecutarbloque(instruccion.instrucciones, number);
            number = arreglo[0];
            str += arreglo[1];
        }
    });
    return [number, str];
}

function ejMetodo(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + number.toString() + "[label =\"Metodo\"]\n";
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Id: " + instruccion.id + "\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    number +=1;
    if(instruccion.parametros.length > 0) {
        str += "Nodo" + number.toString() + "[label =\"Parametros\"]\n";
        str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        pivote += 2;
        number += 1;
        instruccion.parametros.forEach((parametro) => {
            str += "Nodo" + number.toString() + "[label =\"id= " + parametro.id +", tipo:" + regresarDato(parametro.tipo) + "\n";
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            number += 1;
        });
        pivote-=2;
    }
    str += "Nodo" + number.toString() + "[label =\"Instrucciones\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let arreglo = ejecutarbloque(instruccion.instrucciones, number);
    number = arreglo[0];
    str += arreglo[1];
    return [number, str];
}

function ejLlamado(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + number.toString() + "[label =\"Llamado\"]\n";
    number += 1;
    str += "Nodo" + number.toString() + "[label =\"Id: " + instruccion.id + "\"]\n";
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    number +=1;
    if(instruccion.expresiones.length > 0) {
        str += "Nodo" + number.toString() + "[label =\"Parametros\"]\n";
        str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        pivote += 2;
        number += 1;
        instruccion.expresiones.forEach((expresion) => {
            str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
            let arreglo = procesarexp(expresion, number);
            number = arreglo[0];
            str += arreglo[1];
            number += 1;
        });
    }
    return [number, str];
}

function ejExec(instruccion, number){
    let str = "";
    let pivote = number;
    str += "Nodo" + number.toString() + "[label =\"Exec\"]\n";
    number +=1;
    str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
    let arreglo = ejLlamado(instruccion.metodo, number);
    number = arreglo[0];
    str += arreglo[1];
    return [number, str];
}

function procesarexp(expresion, number){
    let str ="";
    let pivote = number;
    str += "Nodo" + pivote.toString() + "[label =\"" + procesarDato(expresion) + "\"]\n";
    if(expresion.operandoIzq !== undefined){
        number += 1;
        str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        let arreglo = procesarexp(expresion.operandoIzq, number);
        number = arreglo[0];
        str += arreglo[1];
    }
    if(expresion.operandoDer !== undefined){
        number += 1;
        str += "Nodo" + pivote.toString() + "->Nodo" + number.toString() + ";\n";
        let arreglo = procesarexp(expresion.operandoDer, number);
        number = arreglo[0];
        str += arreglo[1];
    }
    return [number, str];
}

function procesarDato(expresion){
    console.log(expresion);
    switch(expresion.tipo){
        case tipoValor.ENTERO:
            return expresion.valor.toString();
        case tipoValor.DOUBLE:
            return expresion.valor.toString();
        case tipoValor.BOOL:
            return expresion.valor;
        case tipoValor.CHAR:
            return expresion.valor;
        case tipoValor.STRING:
            return expresion.valor;
        case tipoValor.IDENTIFICADOR:
            return expresion.valor;
        case tipoOperacion.SUMA:
            return "+";
        case tipoOperacion.RESTA:
            return "-";
        case tipoOperacion.MULTIPLICACION:
            return "*";
        case tipoOperacion.DIVISION:
            return "/";
        case tipoOperacion.POTENCIA:
            return "^";
        case tipoOperacion.MODULO:
            return "%";
        case tipoOperacion.NEGATIVO:
            return "-";
        case tipoOperacion.ADICION:
            return "++";
        case tipoOperacion.SUSTRACCION:
            return "--";
        case tipoOperacion.IGUALDAD:
            return "==";
        case tipoOperacion.DIFERENTE:
            return "!=";
        case tipoOperacion.MENOR:
            return "<";
        case tipoOperacion.MENORIGUAL:
            return "<=";
        case tipoOperacion.MAYOR:
            return ">";
        case tipoOperacion.MAYORIGUAL:
            return ">=";
        case tipoOperacion.OR:
            return "||";
        case tipoOperacion.AND:
            return "&&";
        case tipoOperacion.NOT:
            return "!";
    }
}

module.exports.graficarArbol = graficarArbol;