'use strict';
module.exports = (sequelize, DataTypes) => {
  const ram = sequelize.define('ram', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  ram.associate = (models) => {
    // associations can be defined here
  };
  return ram;
};