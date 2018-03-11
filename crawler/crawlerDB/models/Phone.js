'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    Model: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Dimensions: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {});

  Phone.associate = (models) => {
    // associations can be defined here
    const {
      Characteristics,
    } = models;

    Characteristics.belongsToMany(Phone, {
      through: 'phonesCharacteristics',
    });

    Phone.belongsToMany(Characteristics, {
      through: 'phonesCharacteristics',
    });
  };
  return Phone;
};