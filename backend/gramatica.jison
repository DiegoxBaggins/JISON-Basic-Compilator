/* Definición Léxica */
%lex

%options case-insensitive

%%

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

[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
[a-zA-Z]+\b             return 'IDENTIFICADOR';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALDAD' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
% 'POTENCIA'
%left UMENOS

%start ini
%% /* Definición de la gramática */

ini
	: instrucciones EOF  {console.log('Funciono')}
;

instrucciones
	: instruccion instrucciones
	| instruccion
;

instruccion
	: REVALUAR CORIZQ expresion CORDER PTCOMA
;

expresion
	: MENOS expresion %prec UMENOS
	| expresion MAS expresion
	| expresion MENOS expresion
	| expresion POR expresion
	| expresion DIVIDIDO expresion
	| ENTERO
	| DECIMAL
	| PARIZQ expresion PARDER
;