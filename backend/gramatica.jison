
/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

"Evaluar"           return 'REVALUAR';
";"                 return 'PTCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';

"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
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