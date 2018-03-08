'use strict';
module.exports = (sequelize, DataTypes) => {
  const Characteristics = sequelize.define('Characteristics', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ['name', 'value'],
    }],
  });
  Characteristics.associate = (models) => {
    // associations can be defined here
  };
  return Characteristics;
};