var express = require('express');
var router = express.Router();
var parser = require('./analizador/gramatica')

/* GET users listing. */

router.post('/archivo', function(req, res, next){
    let valor = req.files.myFile.data.toString('utf-8');
    res.send(valor);
});

router.post('/texto', function(req, res, next) {
    try {
        let valor = req.body.text;
        console.log(valor);
        parser.parse(valor);
        res.send(valor);
    }
    catch (e){
        console.log(e)
    }
});

module.exports = router;
