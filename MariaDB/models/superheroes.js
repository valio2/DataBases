'use strict';
module.exports = (sequelize, DataTypes) => {
  var Superheroes = sequelize.define('Superheroes', {
    name: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        min: 3,
        max: 60,
      }
    },
    secretIdentity: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        min: 3,
        max: 20,
      }
    }

  }, {});
  Superheroes.associate = function (models) {
    // associations can be defined here
  };
  return Superheroes;
};