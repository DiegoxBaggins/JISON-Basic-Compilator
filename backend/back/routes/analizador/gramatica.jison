/* Definición Léxica */
%lex

%options case-insensitive

%%

\s+                                     //espacios en blanco
"//".*                                  //comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     //comentario muchaslineas

";"                 return 'PTCOMA';
":"                 return 'DOSPUNTOS';
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

[0-9]+("."[0-9]+)?\b            return 'DECIMAL';
[0-9]+\b                        return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*\b       return 'IDENTIFICADOR';
\"[^\"]*\"\b                    { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }
\'[^\']\'\b                     { yytext = yytext.substr(1, yyleng-2); return 'CHAR'; }

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%{//importar de otras clases

%}

/* Asociación de operadores y precedencia */

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALDAD' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'MAS' 'MENOS' 'SUMA2' 'RESTA2'
%left 'MODULO' 'POR' 'DIVIDIDO'
% 'POTENCIA'
%right UMENOS

%start INICIO
%% /* Definición de la gramática */

INICIO
	: CUERPO EOF  {console.log('Lectura Correcta');}
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

DECLARACION
    :TIPO IDENTIFICADOR IGUAL EXP PTCOMA
    |TIPO IDENTIFICADOR PTCOMA
;

IMPRIMIR
    :PRINT PARIZQ EXP PARDER PTCOMA
;

CUERPO
    :CUERPO DECLARACION
    |CUERPO IMPRIMIR
    |DECLARACION
    |IMPRIMIR
;