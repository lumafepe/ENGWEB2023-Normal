var express = require('express');
var router = express.Router();
var App = require('../controllers/controller')

router.get("/plantas/freguesias",App.getFreguesias); // devolve a lista de freguesias ordenada alfabeticamente e sem repetições;
router.get("/plantas/especies",App.getEspecies); // devolve a lista das espécies vegetais ordenada alfabeticamente e sem repetições;
router.get("/plantas/:id",App.getOne);// devolve o registo com identificador id;
router.get("/plantas",App.getAll); //devolve todas as plantas
router.post("/plantas",App.create); // acrescenta um registo novo à BD;
router.delete("/plantas/:id",App.delete); // elimina da BD o registo com o identificador id.

module.exports = router