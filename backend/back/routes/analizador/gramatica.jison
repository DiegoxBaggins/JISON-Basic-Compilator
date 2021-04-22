/* Definición Léxica */
%lex

%options case-insensitive

%%

\s+                                     //espacios en blanco
"//".*                                  //comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     //comentario muchaslineas

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

"="                 return 'IGUAL';
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';
"^"                 return 'POTENCIA';
"%"                 return 'MODULO';
"++"                return 'SUMA2';
"--"                return 'RESTA2';

"int"               return 'IDENENTERO';
"double"            return 'IDENDOUBLE';
"boolean"           return 'IDENBOOL';
"char"              return 'IDENCHAR';
"string"            return 'IDENSTRING';

"\n"                return 'SALTOLINEA';
"\\"                return 'INVERTIDA';
"\""                return 'COMILLAS';
"\t"                return 'TABULACION';
"\'"                return 'COMILLA';

"=="                return 'IGUALDAD';
"!="                return 'DIFERENTE';
"<"                 return 'MENOR';
"<="                return 'MENORIGUAL';
">"                 return 'MAYOR';
">="                return 'MAYORIGUAL';

"||"                return 'OR';
"&&"                return 'AND';
"!"                 return 'NOT';

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

"print"             return 'PRINT';
"toLower"           return 'TOLOWER';
"toUpper"           return 'TOUPPER';
"length"            return 'LENGTH';
"truncate"          return 'TRUNCATE';
"roud"              return 'ROUND';
"typeof"            return 'TYPEOF';
"toString"          return 'TOSTR';
"toCharArray"       return 'TOCHARRAY';
"exec"              return 'EXEC';


/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+\b                        return 'ENTERO';
[0-9]+("."[0-9]+)\b             return 'DECIMAL';
([a-zA-Z])[a-zA-Z0-9_]*\b       return 'IDENTIFICADOR';
\'[^\']\'\b                     { yytext = yytext.substr(1, yyleng-2); return 'CHAR'; }
\"[^\"]*\"\b                    { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%{//importar de otras clases

%}

/* Asociación de operadores y precedencia */

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALDAD' 'DIFERENTE' 'MENOR'  'MAYOR' 'MENORIGUAL' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%right 'SUMA2' 'RESTA2'
%left 'MODULO' 'POR' 'DIVIDIDO'
% 'POTENCIA'
%right UMENOS

%start INICIO
%% /* Definición de la gramática */

INICIO
	: CUERPO EOF  {console.log('Lectura Correcta');}
;

CUERPO
    :CUERPO INSTRUCCIONES
    |CUERPO INSTPRE
    |INSTRUCCIONES
    |INSTPRE
;

TIPO
    :IDENENTERO
    |IDENDOUBLE
    |IDENBOOL
    |IDENCHAR
    |IDENSTRING
    |VOID
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
     :DECLARACION
     |ASIGNACION
     |CASTEO
     |DEFIF
     |DEFSWITCH
     |DEFWHILE
     |DEFFOR
     |DEFDOWHILE
     |BREAK PTCOMA
     |CONTINUE PTCOMA
     |RETURN PTCOMA
     |RETURN EXP PTCOMA
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
;

VECTORES
    :TIPO CORIZQ CORDER IDENTIFICADOR IGUAL NEW TIPO CORIZQ EXPRESION CORIZQ PTCOMA
    |TIPO CORIZQ CORDER IDENTIFICADOR IGUAL CORIZQ LISTAVALORES CORIZQ PTCOMA
;

LISTAVALORES
    :LISTAVALORES COMA EXP
    |EXP
;

LISTAS
    :LIST MENOR TIPO MAYOR IDENTIFICADOR IGUAL NEW LIST MENOR TIPO MAYOR PTCOMA
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

INSTPRE
    :IMPRIMIR
    |INSLOWER
    |INSUPPER
    |INSLENGTH
    |INSTRUNCATE
    |INSROUND
    |INSTYPE
;

IMPRIMIR
    :PRINT PARIZQ EXP PARDER PTCOMA
;

INSTLOWER
    :TOLOWER PARIZQ EXPRESION PARDER PTCOMA
;

INSTUPPER
    :TOUPPER PARIZQ EXPRESION PARDER PTCOMA
;

INSLENGTH
    :LENGTH PARIZQ EXPRESION PARDER PTCOMA
;

INSTRUNCATE
    :TRUNCATE PARIZQ EXPRESION PARDER PTCOMA
;

INSROUND
    :ROUND PARIZQ EXPRESION PARDER PTCOMA
;

INSTYPE
    :TYPEOF PARIZQ EXPRESION PARDER PTCOMA
;