'use strict';
module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  Website.associate = function(models) {
    // associations can be defined here
  };
  return Website;
};