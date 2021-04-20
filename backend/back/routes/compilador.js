var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    let nombre = req.body.nombre;
    res.json('exito' + nombre);
});

module.exports = router;
