'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Brand.associate = function(models) {
    // associations can be defined here
  };
  return Brand;
};