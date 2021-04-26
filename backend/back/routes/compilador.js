const express = require('express');
const router = express.Router();
const parser = require('./analizador/gramatica')
const interprete = require('../routes/interprete/interprete');

/* GET users listing. */

router.post('/archivo', function(req, res, next){
    let valor = req.files.myFile.data.toString('utf-8');
    res.send(valor);
});

router.post('/texto', function(req, res, next) {
    try {
        let valor = req.body.text;
        console.log(valor);
        let arbol = parser.parse(valor);
        let salida = interprete.ejecutar(arbol);
        console.log(salida);
        res.send(salida);
    }
    catch (e){
        console.log(e)
    }
});

module.exports = router;
