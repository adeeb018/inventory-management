// src/models/projectPartUsage.model.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProjectPartUsage', {
      usage_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      project_id: DataTypes.INTEGER,
      part_id: DataTypes.INTEGER,
      manufacturer_part_id: DataTypes.INTEGER,
      quantity_used: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'project_part_usage',
      timestamps: false
    });
  };
  