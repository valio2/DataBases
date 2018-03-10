'use strict';
module.exports = (sequelize, DataTypes) => {
  const phonesCharacteristics = sequelize.define('phonesCharacteristics', {
    PhoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    CharacteristicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {});
  phonesCharacteristics.associate = (models) => {
    // associations can be defined here
    const {
      Phone,
      Characteristics,
    } = models;
    phonesCharacteristics.belongsTo(Phone);
    phonesCharacteristics.belongsTo(Characteristics);
  };
  return phonesCharacteristics;
};