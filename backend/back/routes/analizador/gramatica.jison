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
"."                 return 'PUNTO';
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
"true"              return 'TRUEE';
"false"             return 'FALSEE';
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

[0-9]+\b                        return 'ENTERO';
[0-9]+("."[0-9]+)\b             return 'DECIMAL';
([a-zA-Z])[a-zA-Z0-9_]*         return 'IDENTIFICADOR';
\'[^\']\'                       { yytext = yytext.substr(1, yyleng-2); return 'CHAR'; }
\"[^\"]*\"                      { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }

//con slash invertido
"\n"                return 'SALTOLINEA';
"\\"                return 'INVERTIDA';
"\t"                return 'TABULACION';
"\'"                return 'COMILLA';
"\""                return 'COMILLAS';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%{//importar de otras clases

%}

/* Asociación de operadores y precedencia */

%left 'IGUAL'
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
%left 'PARIZQ' 'PARDER' 'LLAVIZQ' 'LLAVDER'

%start INICIO
%% /* Definición de la gramática */

INICIO
	: CUERPO EOF  {console.log('Lectura Correcta');}
;

CUERPO
    :INSTRUCCIONES
;

TIPO
    :IDENENTERO
    |IDENDOUBLE
    |IDENBOOL
    |IDENCHAR
    |IDENSTRING
;

EXP
    :EXP MAS EXP
    |EXP MENOS EXP
    |EXP POR EXP
    |EXP DIVIDIDO EXP
    |EXP POTENCIA EXP
    |EXP MODULO EXP
    |PARIZQ EXP PARDER
    |MENOS EXP %prec UMENOS
    |EXP SUMA2
    |EXP RESTA2
    |ENTERO
    |DECIMAL
    |CHAR
    |CADENA
    |TRUE
    |FALSE
    |IDENTIFICADOR
    |INSTRETUR
;

EXPLOGICA
    :EXPLOGICA IGUALDAD EXPLOGICA
    |EXPLOGICA DIFERENTE EXPLOGICA
    |EXPLOGICA MENOR EXPLOGICA
    |EXPLOGICA MENORIGUAL EXPLOGICA
    |EXPLOGICA MAYOR EXPLOGICA
    |EXPLOGICA MAYORIGUAL EXPLOGICA
    |EXPLOGICA OR EXPLOGICA
    |EXPLOGICA AND EXPLOGICA
    |NOT EXPLOGICA
    |EXP
;

INSTRUCCIONES
     :INSTRUCCIONES ELEMINST
     |ELEMINST
;

ELEMINST
     :DECLARACION
     |ASIGNACION
     |CASTEO
     |DEFTER PTCOMA
     |DEFIF
     |DEFSWITCH
     |DEFWHILE
     |DEFFOR
     |DEFDOWHILE
     |BREAK PTCOMA
     |CONTINUE PTCOMA
     |RETURN PTCOMA
     |RETURN EXP PTCOMA
     |IMPRIMIR
     |LISTAGREGAR
     |METODO
     |FUNCION
     |LLAMADA PTCOMA
     |EXEC LLAMADA PTCOMA
;

CASTEO
    :TIPO IDENTIFICADOR IGUAL PARIZQ TIPO EXPRESION PTCOMA
    |IDENTIFICADOR IGUAL PARIZQ TIPO EXPRESION PTCOMA
;

DECLARACION
    :TIPO IDENTIFICADOR IGUAL EXP PTCOMA
    |TIPO IDENTIFICADOR PTCOMA
    |VECTORES
    |LISTAS
;

ASIGNACION
    :IDENTIFICADOR IGUAL EXP PTCOMA
    |IDENTIFICADOR CORIZQ EXP CORDER IGUAL EXP PTCOMA
    |IDENTIFICADOR CORIZQ CORIZQ EXP CORDER CORDER IGUAL EXP PTCOMA
;

VECTORES
    :TIPO CORIZQ CORDER IDENTIFICADOR IGUAL NEW TIPO CORIZQ EXPRESION CORDER PTCOMA
    |TIPO CORIZQ CORDER IDENTIFICADOR IGUAL CORIZQ LISTAVALORES CORDER PTCOMA
;

LISTAVALORES
    :LISTAVALORES COMA EXP
    |EXP
;

LISTAS
    :LIST MENOR TIPO MAYOR IDENTIFICADOR IGUAL NEW LIST MENOR TIPO MAYOR PTCOMA
    |LIST MENOR CHAR MAYOR IDENTIFICADOR IGUAL INSTOCHARRAY PTCOMA
;

INSTOCHARRAY
    :TOCHARRAY PARIZQ EXP PARDER
;

LISTAGREGAR
    :IDENTIFICADOR PUNTO ADD PARIZQ EXP PARDER PTCOMA
;

DEFTER
    :EXPLOGICA INTERR INSTRTER DOSPUNTOS INSTRTER
;

INSTRTER
     :DECLARACION
     |ASIGNACION
     |CASTEO
     |BREAK PTCOMA
     |CONTINUE PTCOMA
     |RETURN PTCOMA
     |RETURN EXP PTCOMA
     |EXP
;

DEFIF
    :DEFIC IF PARIZQ EXPLOGICA PARDER LLAVIZQ INSTRUCCIONES LLAVDER
    |DEFIC ELSE LLAVIZQ INSTRUCCIONES LLAVDER
    |IF PARIZQ EXPLOGICA PARDER LLAVIZQ INSTRUCCIONES LLAVDER
;

DEFSWITCH
    :SWITCH PARIZQ EXPRESION PARDER LLAVIZQ CASES LLADER
;

CASES
    :CASES DEFAULT DOSPUNTOS INSTRUCCIONES
    |CASES CASE EXP DOSPUNTOS INSTRUCCIONES
    |DEFAULT DOSPUNTOS INSTRUCCIONES
    |CASE EXP DOSPUNTOS INSTRUCCIONES
;

DEFWHILE
    :WHILE PARIZQ EXPLOGICA PARDER LLAVIZQ INSTRUCCIONES LLAVDER
;

DEFFOR
    :FOR PARIZQ INSTFOR PARDER LLAVIZQ INSTRUCCIONES LLAVDER
;

INSTFOR
    :DECLARACION EXPLOGICA PTCOMA EXP
    |ASIGNACION EXPLOGICA PTCOMA EXP
;

DEFDOWHILE
    :DO LLAVIZQ INSTRUCCIONES LLAVDER WHILE PARIZQ EXPLOGICA PARDER PTCOMA
;

METODO
    :VOID IDENTIFICADOR PARIZQ LISTAPAR PARDER CORIZQ INSTRUCCIONES CORDER
    |VOID IDENTIFICADOR PARIZQ PARDER CORIZQ INSTRUCCIONES CORDER
;

FUNCION
    :TIPO IDENTIFICADOR PARIZQ LISTAPAR PARDER CORIZQ INSTRUCCIONES CORDER
    |TIPO IDENTIFICADOR PARIZQ PARDER CORIZQ INSTRUCCIONES CORDER
;

LISTAPAR
    :LISTAVPAR COMA TIPO IDENTIFICADOR
    |TIPO IDENTIFICADOR
;

LLAMADA
    :IDENTIFICADOR PARIZQ LISTALLA PARDER
    |IDENTIFICADOR PARIZQ PARDER
;

LISTALLA
    :LISTALLA COMA EXP
    |EXP
;

INSTRETUR
    :INSLOWER
    |INSUPPER
    |INSLENGTH
    |INSTRUNCATE
    |INSROUND
    |INSTYPE
    |INSTOSTR
    |LLAMADA
;

IMPRIMIR
    :PRINT PARIZQ EXP PARDER PTCOMA
;

INSTLOWER
    :TOLOWER PARIZQ EXPRESION PARDER
;

INSTUPPER
    :TOUPPER PARIZQ EXPRESION PARDER
;

INSLENGTH
    :LENGTH PARIZQ EXPRESION PARDER
;

INSTRUNCATE
    :TRUNCATE PARIZQ EXPRESION PARDER
;

INSROUND
    :ROUND PARIZQ EXPRESION PARDER
;

INSTYPE
    :TYPEOF PARIZQ EXPRESION PARDER
;

INSTOSTR
    :TOSTR PARIZQ EXPRESION PARDER
;