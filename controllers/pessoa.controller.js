const db = require("../models");
const Pessoa = db.pessoas;
const Op = db.Sequelize.Op;

// Create and Save a new Pessoa
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Pessoa
  const pessoa = {
    nome: req.body.nome,
    dataNascimento: req.body.dataNascimento,
  };

  // Save Pessoa in the database
  Pessoa.create(pessoa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pessoa.",
      });
    });
};
// Retrieve all Pessoas from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Pessoa.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pessoas.",
      });
    });
};

// Find a single Pessoa with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pessoa.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Pessoa with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Pessoa with id=" + id,
      });
    });
};
// Update a Pessoa by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pessoa.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pessoa was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Pessoa with id=${id}. Maybe Pessoa was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Pessoa with id=" + id,
      });
    });
};

// Delete a Pessoa with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pessoa.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pessoa was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Pessoa with id=${id}. Maybe Pessoa was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Pessoa with id=" + id,
      });
    });
};

// Delete all Pessoas from the database.
exports.deleteAll = (req, res) => {
  Pessoa.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Pessoas were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pessoas.",
      });
    });
};
