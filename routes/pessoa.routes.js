module.exports = (app) => {
  const pessoas = require("../controllers/pessoa.controller.js");
  var router = require("express").Router();

  // Create a new Pessoa
  router.post("/", pessoas.create);
  // Retrieve all Pessoas
  router.get("/", pessoas.findAll);
  // Retrieve a single Pessoa with id
  router.get("/:id", pessoas.findOne);
  // Update a Pessoa with id
  router.put("/:id", pessoas.update);
  // Delete a Pessoa with id
  router.delete("/:id", pessoas.delete);
  // Create a new Pessoa
  router.delete("/", pessoas.deleteAll);
  app.use("/pessoas", router);
};
