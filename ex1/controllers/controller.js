
const App = require("../models/model.js");

// - Devolve a lista de todas as plantas
exports.getAll = (req, res) => {
  let p1={};
  if (req.query.hasOwnProperty('especie')){
    p1.Espécie=req.query.especie
  }
  if (req.query.hasOwnProperty('implant')){
    p1.Implantação=req.query.implant
  }
  App.find(p1)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

//  Devolve a informação completa de uma planta;
exports.getOne = (req, res) => {
  App.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "planta not found with id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "planta not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.id,
      });
    });
};

// - Devolve a lista de freguesias, sem repetições;
exports.getFreguesias = (req, res) => {
  App.distinct('Freguesia').exec()
    .then((data) => {
      res.send(data.sort());
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// - Devolve a lista de especies, sem repetições;
exports.getEspecies = (req, res) => {
  App.distinct('Espécie').exec()
    .then((data) => {
      res.send(data.sort());
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};


// Create and Save a new Planta
exports.create = (req, res) => {
  App.distinct('_id').exec()
    .then((data) => {
      let v = data.reduce((a, b) => Math. max(a, b), -Infinity);
      const planta = new App({
        _id: v+1,
        Número_de_Registo: req.body.Número_de_Registo,
        Código_de_rua: req.body.Código_de_rua,
        Rua: req.body.Rua,
        Local: req.body.Local,
        Freguesia: req.body.Freguesia,
        Espécie: req.body.Espécie,
        Nome_Científico: req.body.Nome_Científico,
        Origem: req.body.Origem,
        Data_de_Plantação: req.body.Data_de_Plantação,
        Estado: req.body.Estado,
        Caldeira: req.body.Caldeira,
        Tutor: req.body.Tutor,
        Implantação: req.body.Implantação,
        Gestor: req.body.Gestor,
        Data_de_actualização: req.body.Data_de_actualização,
        Número_de_intervenções: req.body.Número_de_intervenções
        });
      planta
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Message.",
          });
        });
        
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};


// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
  App.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "planta not found with id " + req.params.id,
        });
      }
      res.send({ message: "planta deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "planta not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete planta with id " + req.params.id,
      });
    });
};



