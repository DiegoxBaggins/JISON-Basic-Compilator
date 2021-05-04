/* Definición Léxica */
%lex

%options case-insensitive

%%

\s+                                     //espacios en blanco
"//".*                                  //comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     //comentario muchaslineas

//incremento decremento
"++"                return 'SUMA2';
"--"                return 'RESTA2';

//relacionales
"=="                return 'IGUALDAD';
"!="                return 'DIFERENTE';
"<="                return 'MENORIGUAL';
">="                return 'MAYORIGUAL';
"<"                 return 'MENOR';
">"                 return 'MAYOR';

//logicos
"||"                return 'OR';
"&&"                return 'AND';
"!"                 return 'NOT';

//simbolos basicos
";"                 return 'PTCOMA';
":"                 return 'DOSPUNTOS';
","                 return 'COMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';
"{"                 return 'LLAVIZQ';
"}"                 return 'LLAVDER';
"?"                 return 'INTERR';

//aritmeticos
"="                 return 'IGUAL';
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';
"^"                 return 'POTENCIA';
"%"                 return 'MODULO';

//identificadores
"int"               return 'IDENENTERO';
"double"            return 'IDENDOUBLE';
"boolean"           return 'IDENBOOL';
"char"              return 'IDENCHAR';
"string"            return 'IDENSTRING';

//reservadas
"if"                return 'IF';
"switch"            return 'SWITCH';
"else"              return 'ELSE';
"case"              return 'CASE';
"default"           return 'DEFAULT';
"break"             return 'BREAK';
"while"             return 'WHILE';
"for"               return 'FOR';
"do"                return 'DO';
"continue"          return 'CONTINUE';
"return"            return 'RETURN';
"void"              return 'VOID';
"true"              return 'TRUE';
"false"             return 'FALSE';
"new"               return 'NEW';
"list"              return 'LIST';
"add"               return 'ADD';

//reservadas metodos
"print"             return 'PRINT';
"toLower"           return 'TOLOWER';
"toUpper"           return 'TOUPPER';
"length"            return 'LENGTH';
"truncate"          return 'TRUNCATE';
"roud"              return 'ROUND';
"typeOf"            return 'TYPEOF';
"toString"          return 'TOSTR';
"toCharArray"       return 'TOCHARRAY';
"exec"              return 'EXEC';


/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+("."[0-9]+)\b            return 'DECIMAL';
[0-9]+\b                        return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*         return 'IDENTIFICADOR';
\'[^\']\'                       { yytext = yytext.substr(1, yyleng-2); return 'CHAR'; }
\".*\"                          { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }

//con slash invertido o con problemas
"\n"                return 'SALTOLINEA';
"\\"                return 'INVERTIDA';
"\t"                return 'TABULACION';
"\'"                return 'COMILLA';
"\""                return 'COMILLAS';
"."                 return 'PUNTO';

<<EOF>>                 return 'EOF';

.                       { errores.push(instrucciones.nuevoError("Lexico", 'Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column,yylloc.first_line,yylloc.first_column)); }
/lex

%{//importar de otras clases
    const instrucciones = require('../arbol/instrucciones').INSTRUCCION;
    const tipoOperacion = require('../arbol/instrucciones').TIPO_OPERACION;
    const tipoValor = require('../arbol/instrucciones').TIPO_VALOR;
    const tipoDato = require('../arbol/tablasimbolos').TIPO_DATO;
    let errores = [];
%}

/* Asociación de operadores y precedencia */

%left 'IGUAL'
%left 'INTERR'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALDAD' 'DIFERENTE'
%left 'MAYOR' 'MENOR' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%right 'SUMA2' 'RESTA2'
%left  'POR' 'DIVIDIDO' 'MODULO'
%right 'POTENCIA'
%right UMENOS
%right UCASTEO
%left 'PARIZQ' 'PARDER' 'LLAVIZQ' 'LLAVDER'

%start INICIO
%% /* Definición de la gramática */

INICIO
	: INSTRUCCIONGLOBAL EOF  {console.log('Lectura Correcta'); errorsCopy = errores.map((x) => x); errores = []; return [$1, errorsCopy]; }
;

TIPO
    :IDENENTERO                     { $$ = tipoDato.ENTERO; }
    |IDENDOUBLE                     { $$ = tipoDato.DOUBLE; }
    |IDENBOOL                       { $$ = tipoDato.BOOL; }
    |IDENCHAR                       { $$ = tipoDato.CHAR; }
    |IDENSTRING                     { $$ = tipoDato.STRING; }
;

EXP
    :EXP IGUALDAD EXP               { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.IGUALDAD, $1, $3); }
    |EXP DIFERENTE EXP              { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.DIFERENTE, $1, $3); }
    |EXP MENOR EXP                  { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.MENOR, $1, $3); }
    |EXP MENORIGUAL EXP             { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.MENORIGUAL, $1, $3); }
    |EXP MAYOR EXP                  { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.MAYOR, $1, $3); }
    |EXP MAYORIGUAL EXP             { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.MAYORIGUAL, $1, $3); }
    |EXP OR EXP                     { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.OR, $1, $3); }
    |EXP AND EXP                    { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.AND, $1, $3); }
    |EXP MAS EXP                    { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.SUMA, $1, $3); }
    |EXP MENOS EXP                  { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.RESTA, $1, $3); }
    |EXP POR EXP                    { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.MULTIPLICACION, $1, $3); }
    |EXP DIVIDIDO EXP               { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.DIVISION, $1, $3); }
    |EXP POTENCIA EXP               { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.POTENCIA, $1, $3); }
    |EXP MODULO EXP                 { $$ = instrucciones.nuevaOperacionBinaria(tipoOperacion.MODULO, $1, $3); }
    |PARIZQ EXP PARDER              { $$ = $2; }
    |MENOS EXP %prec UMENOS         { $$ = instrucciones.nuevaOperacionUnaria(tipoOperacion.NEGATIVO, $2); }
    |NOT EXP                        { $$ = instrucciones.nuevaOperacionUnaria(tipoOperacion.NOT, $2); }
    |EXP SUMA2                      { $$ = instrucciones.nuevaOperacionUnaria(tipoOperacion.ADICION, $1); }
    |EXP RESTA2                     { $$ = instrucciones.nuevaOperacionUnaria(tipoOperacion.SUSTRACCION, $1); }
    |DEFTER                         { $$ = $1; }
    |CASTEO                         { $$ = $1; }
    |ENTERO                         { $$ = instrucciones.nuevoValor(tipoValor.ENTERO, Number($1)); }
    |DECIMAL                        { $$ = instrucciones.nuevoValor(tipoValor.DOUBLE, Number($1)); }
    |CHAR                           { $$ = instrucciones.nuevoValor(tipoValor.CHAR, $1); }
    |CADENA                         { $$ = instrucciones.nuevoValor(tipoValor.STRING, $1); }
    |TRUE                           { $$ = instrucciones.nuevoValor(tipoValor.BOOL, true); }
    |FALSE                          { $$ = instrucciones.nuevoValor(tipoValor.BOOL, false); }
    |IDENTIFICADOR                  { $$ = instrucciones.nuevoValor(tipoValor.IDENTIFICADOR, $1); }
    |INSTRETUR                      { $$ = $1; }
    |IDENTIFICADOR CORIZQ EXP CORDER                    { $$ = instrucciones.nuevoValor(tipoValor.IDENTIFICADOR, $1); }
    |IDENTIFICADOR CORIZQ CORIZQ EXP CORDER CORDER      { $$ = instrucciones.nuevoValor(tipoValor.IDENTIFICADOR, $1); }
    |error     { errores.push(instrucciones.nuevoError("Sintactico" ,'Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column,this._$.first_line,this._$.first_column)); }
    ;

DEFTER
    :EXP INTERR EXP DOSPUNTOS EXP         { $$ = instrucciones.nuevoTer($1, $3, $5); }
;

INSTRUCCIONGLOBAL
     :INSTRUCCIONGLOBAL ELEMGLOBAL        { $1.push($2); $$ = $1; }
     |ELEMGLOBAL                          { $$ = [$1]; }
     ;

ELEMGLOBAL
     :DECLARACION                   { $$ = $1; }
     |ASIGNACION PTCOMA             { $$ = $1; }
     |LISTAGREGAR                   { $$ = $1; }
     |METODO                        { $$ = $1; }
     |FUNCION                       { $$ = $1; }
     |EXEC LLAMADA PTCOMA           { $$ = instrucciones.nuevoExc($2); }
     |error     { errores.push(instrucciones.nuevoError("Sintactico" ,'Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column,this._$.first_line,this._$.first_column)); }
;

INSTRUCCIONES
     :INSTRUCCIONES ELEMINST        { $1.push($2); $$ = $1; }
     |ELEMINST                      { $$ = [$1]; }
;

ELEMINST
     :DECLARACION                   { $$ = $1; }
     |ASIGNACION PTCOMA             { $$ = $1; }
     |DEFIF                         { $$ = instrucciones.nuevoBloqueIf($1); }
     |DEFSWITCH                     { $$ = $1; }
     |DEFWHILE                      { $$ = $1; }
     |DEFFOR                        { $$ = $1; }
     |DEFDOWHILE                    { $$ = $1; }
     |BREAK PTCOMA                  { $$ = instrucciones.nuevoBreak(); }
     |CONTINUE PTCOMA               { $$ = instrucciones.nuevoContinue(); }
     |RETURN PTCOMA                 { $$ = instrucciones.nuevoReturn(undefined); }
     |RETURN EXP PTCOMA             { $$ = instrucciones.nuevoReturn($2); }
     |IMPRIMIR                      { $$ = $1; }
     |LISTAGREGAR                   { $$ = $1; }
     |LLAMADA PTCOMA                { $$ = $1; }
     |error     { errores.push(instrucciones.nuevoError("Sintactico" ,'Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column,this._$.first_line,this._$.first_column)); }
;

CASTEO
    :PARIZQ TIPO PARDER EXP %prec UCASTEO
;

DECLARACION
    :TIPO IDENTIFICADOR IGUAL EXP PTCOMA            { $$ = instrucciones.nuevaDeclaracion($1, undefined, $2, $4, this._$.first_line, this._$.first_column); }
    |TIPO IDENTIFICADOR PTCOMA                      { $$ = instrucciones.nuevaDeclaracion($1, undefined, $2, undefined, this._$.first_line, this._$.first_column); }
    |VECTORES
    |LISTAS
;

ASIGNACION
    :IDENTIFICADOR IGUAL EXP                                            { $$ = instrucciones.nuevaAsignacion($1, $3); }
    |IDENTIFICADOR SUMA2                                                { $$ = instrucciones.nuevaAdicion($1); }
    |IDENTIFICADOR RESTA2                                               { $$ = instrucciones.nuevaSustraccion($1); }
    |IDENTIFICADOR CORIZQ EXP CORDER IGUAL EXP
    |IDENTIFICADOR CORIZQ CORIZQ EXP CORDER CORDER IGUAL EXP
;

VECTORES
    :TIPO CORIZQ CORDER IDENTIFICADOR IGUAL NEW TIPO CORIZQ EXP CORDER PTCOMA
    |TIPO CORIZQ CORDER IDENTIFICADOR IGUAL LLAVIZQ LISTAVALORES LLAVDER PTCOMA
;

LISTAVALORES
    :LISTAVALORES COMA EXP
    |EXP
;

LISTAS
    :LIST MENOR TIPO MAYOR IDENTIFICADOR IGUAL NEW LIST MENOR TIPO MAYOR PTCOMA
    |LIST MENOR TIPO MAYOR IDENTIFICADOR IGUAL INSTOCHARRAY PTCOMA
;

INSTOCHARRAY
    :TOCHARRAY PARIZQ EXP PARDER
;

LISTAGREGAR
    :IDENTIFICADOR PUNTO ADD PARIZQ EXP PARDER PTCOMA
;

DEFIF
    :DEFIF ELSE IF PARIZQ EXP PARDER LLAVIZQ INSTRUCCIONES LLAVDER      { $1.push(instrucciones.nuevoIf($5, $8)); $$ = $1; }
    |DEFIF ELSE LLAVIZQ INSTRUCCIONES LLAVDER                           { $1.push(instrucciones.nuevoElse($4)); $$ = $1; }
    |IF PARIZQ EXP PARDER LLAVIZQ INSTRUCCIONES LLAVDER                 { $$ = [instrucciones.nuevoIf($3, $6)]; }
;

DEFSWITCH
    :SWITCH PARIZQ EXP PARDER LLAVIZQ CASES LLAVDER                     { $$ = instrucciones.nuevoSwitch($3, $6); }
;

CASES
    :CASES DEFAULT DOSPUNTOS INSTRUCCIONES          { $1.push(instrucciones.nuevoDefault($4)); $$ = $1; }
    |CASES CASE EXP DOSPUNTOS INSTRUCCIONES         { $1.push(instrucciones.nuevoCase($3, $5)); $$ = $1; }
    |DEFAULT DOSPUNTOS INSTRUCCIONES                { $$ = [instrucciones.nuevoDefault($3)]; }
    |CASE EXP DOSPUNTOS INSTRUCCIONES               { $$ = [instrucciones.nuevoCase($2, $4)]; }
;

DEFWHILE
    :WHILE PARIZQ EXP PARDER LLAVIZQ INSTRUCCIONES LLAVDER      { $$ = instrucciones.nuevoWhile($3, $6); }
;

DEFFOR
    :FOR PARIZQ DECLARACION EXP PTCOMA ASIGNACION PARDER LLAVIZQ INSTRUCCIONES LLAVDER     { $$ = instrucciones.nuevoFor($3, $4, $6, $9); }
    |FOR PARIZQ ASIGNACION PTCOMA EXP PTCOMA ASIGNACION PARDER LLAVIZQ INSTRUCCIONES LLAVDER      { $$ = instrucciones.nuevoFor($3, $5, $7, $10); }
;

DEFDOWHILE
    :DO LLAVIZQ INSTRUCCIONES LLAVDER WHILE PARIZQ EXP PARDER PTCOMA        { $$ = instrucciones.nuevoDoWhile($7, $3); }
;

METODO
    :VOID IDENTIFICADOR PARIZQ LISTAPAR PARDER LLAVIZQ INSTRUCCIONES LLAVDER { $$ = instrucciones.nuevoMetodo($2, $4, $7, this._$.first_line, this._$.first_column); }
    |VOID IDENTIFICADOR PARIZQ PARDER LLAVIZQ INSTRUCCIONES LLAVDER          { $$ = instrucciones.nuevoMetodo($2, [], $6, this._$.first_line, this._$.first_column); }
;

FUNCION
    :TIPO IDENTIFICADOR PARIZQ LISTAPAR PARDER LLAVIZQ INSTRUCCIONES LLAVDER { $$ = instrucciones.nuevaFuncion($1, $2, $4, $7, this._$.first_line, this._$.first_column); }
    |TIPO IDENTIFICADOR PARIZQ PARDER LLAVIZQ INSTRUCCIONES LLAVDER          { $$ = instrucciones.nuevaFuncion($1, $2, [], $6, this._$.first_line, this._$.first_column); }
;

LISTAPAR
    :LISTAPAR COMA TIPO IDENTIFICADOR       { $1.push(instrucciones.nuevoParametro($3,$4)); $$ = $1; }
    |TIPO IDENTIFICADOR                     { $$ = [instrucciones.nuevoParametro($1,$2)]; }
;

LLAMADA
    :IDENTIFICADOR PARIZQ LISTALLA PARDER   { $$ = instrucciones.nuevaLlamada($1, $3, this._$.first_line, this._$.first_column); }
    |IDENTIFICADOR PARIZQ PARDER            { $$ = instrucciones.nuevaLlamada($1, [], this._$.first_line, this._$.first_column); }
;

LISTALLA
    :LISTALLA COMA EXP                      { $1.push($3); $$ = $1; }
    |EXP                                    { $$ = [$1]; }
;

INSTRETUR
    :INSTLOWER
    |INSTUPPER
    |INSLENGTH
    |INSTRUNCATE
    |INSROUND
    |INSTYPE
    |INSTOSTR
    |LLAMADA
;

IMPRIMIR
    :PRINT PARIZQ EXP PARDER PTCOMA         { $$ = instrucciones.nuevoImprimir($3); }
;

INSTLOWER
    :TOLOWER PARIZQ EXP PARDER              { $$ = instrucciones.nuevoLower($3); }
;

INSTUPPER
    :TOUPPER PARIZQ EXP PARDER              { $$ = instrucciones.nuevoUpper($3); }
;

INSLENGTH
    :LENGTH PARIZQ EXP PARDER               { $$ = instrucciones.nuevoLen($3); }
;

INSTRUNCATE
    :TRUNCATE PARIZQ EXP PARDER             { $$ = instrucciones.nuevoTrun($3); }
;

INSROUND
    :ROUND PARIZQ EXP PARDER                { $$ = instrucciones.nuevoRound($3); }
;

INSTYPE
    :TYPEOF PARIZQ EXP PARDER               { $$ = instrucciones.nuevoType($3); }
;

INSTOSTR
    :TOSTR PARIZQ EXP PARDER                { $$ = instrucciones.nuevoTostr($3); }
;