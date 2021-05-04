const express = require('express');
const router = express.Router();
const parser = require('./analizador/gramatica')
const interprete = require('../routes/interprete/interprete');
const graficarArbol = require('./graficar').graficarArbol;
const imageToBase64 = require('image-to-base64');

let tablaGeneral = [];
let tablaErrores = [];
/* GET users listing. */

router.post('/archivo', function(req, res, next){
    let valor = req.files.myFile.data.toString('utf-8');
    res.send(valor);
});

router.post('/texto', function(req, res, next) {
    try {
        tablaGeneral = [];
        tablaErrores = [];
        let valor = req.body.text;
        console.log(valor);
        let arbol = parser.parse(valor);
        console.log(arbol[1]);
        let lista = interprete.ejecutar(arbol[0], arbol[1]);
        let salida = lista[0];
        tablaGeneral = lista[1];
        tablaErrores = lista[2];
        console.log(tablaErrores);
        graficarArbol(arbol[0]);
        res.send(salida);
    }
    catch (e){
        console.log(e)
    }
});

router.get('/tablaVariables', function(req, res, next) {
    try {
        res.send(tablaGeneral);
    }
    catch (e){
        console.log(e)
    }
});

router.get('/tablaErrores', function(req, res, next) {
    try {
        res.send(tablaErrores);
    }
    catch (e){
        console.log(e)
    }
});

router.get('/imagenArbol', function(req, res, next) {
    imageToBase64("./arbol.png") // Path to the image
        .then(
            (response) => {
                res.send(response); // "cGF0aC90by9maWxlLmpwZw=="
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
});

module.exports = router;
