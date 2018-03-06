'use strict';
module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Website.associate = function(models) {
    // associations can be defined here
  };
  return Website;
};