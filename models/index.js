const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cachorros = require("./cachorro.model.js")(sequelize, Sequelize);
db.pessoas = require("./pessoa.model.js")(sequelize, Sequelize);

db.pessoas.hasMany(db.cachorros);
db.cachorros.belongsTo(db.pessoas);
module.exports = db;
