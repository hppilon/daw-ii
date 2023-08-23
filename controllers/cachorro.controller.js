const db = require("../models");
const Cachorro = db.cachorros;
const Op = db.Sequelize.Op;

// Create and Save a new Cachorro
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Cachorro
  const cachorro = {
    nome: req.body.nome,
    idade: req.body.idade,
    raca: req.body.raca,
  };

  // Save Cachorro in the database
  Cachorro.create(cachorro)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cachorro.",
      });
    });
};
// Retrieve all Cachorros from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Cachorro.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cachorros.",
      });
    });
};

// Find a single Cachorro with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cachorro.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cachorro with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Cachorro with id=" + id,
      });
    });
};
// Update a Cachorro by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cachorro.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cachorro was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Cachorro with id=${id}. Maybe Cachorro was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cachorro with id=" + id,
      });
    });
};

// Delete a Cachorro with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cachorro.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cachorro was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Cachorro with id=${id}. Maybe Cachorro was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Cachorro with id=" + id,
      });
    });
};

// Delete all Cachorros from the database.
exports.deleteAll = (req, res) => {
  Cachorro.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Cachorros were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cachorros.",
      });
    });
};
