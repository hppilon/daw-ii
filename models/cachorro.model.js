module.exports = (sequelize, Sequelize) => {
  const Cachorro = sequelize.define(
    "cachorro",
    {
      nome: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      idade: {
        type: Sequelize.INTEGER,
      },
      raca: {
        type: Sequelize.STRING,
      },
    },
    { freezeTableName: true }
  );

  return Cachorro;
};
