// src/models/alternatePart.model.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AlternatePart', {
      alternate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      base_manufacturer_part_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      alternate_manufacturer_part_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      notes: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'alternate_parts',
      timestamps: false
    });
  };
  