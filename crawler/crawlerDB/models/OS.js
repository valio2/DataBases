'use strict';
module.exports = (sequelize, DataTypes) => {
  const OS = sequelize.define('OS', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  OS.associate = function(models) {
    // associations can be defined here
  };
  return OS;
};