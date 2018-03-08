'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    model: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    cpu: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Dual_sim: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    '4G': {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Dimensions: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Warranty: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Battery: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Weight: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
    Sd_slot: {
      type: DataTypes.STRING,
      defaultValue: 'Не е уточнено',
      allowNull: false,
    },
  }, {});

  Phone.associate = (models) => {
    // associations can be defined here
    const {
      Website,
      Brand,
      OS,
      ram,
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
    Phone.belongsTo(ram, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return Phone;
};