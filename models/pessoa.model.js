const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Pessoa = sequelize.define(
    "pessoa",
    {
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataNascimento: {
        type: Sequelize.DATEONLY,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Pessoa;
};
