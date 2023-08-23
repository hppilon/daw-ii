module.exports = (app) => {
  const cachorros = require("../controllers/cachorro.controller.js");
  var router = require("express").Router();

  // Create a new Cachorro
  router.post("/", cachorros.create);
  // Retrieve all Cachorros
  router.get("/", cachorros.findAll);
  // Retrieve a single Cachorro with id
  router.get("/:id", cachorros.findOne);
  // Update a Cachorro with id
  router.put("/:id", cachorros.update);
  // Delete a Cachorro with id
  router.delete("/:id", cachorros.delete);
  // Create a new Cachorro
  router.delete("/", cachorros.deleteAll);
  app.use("/cachorros", router);
};
