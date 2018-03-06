'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dual_sim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    '4G': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dimensions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Warranty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Battery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Phone.associate = (models) => {
    // associations can be defined here
    const {
      Website,
      Brand,
      OS,
    } = models;

    Phone.belongsTo(Website, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    Phone.belongsTo(Brand, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    Phone.belongsTo(OS, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return Phone;
};