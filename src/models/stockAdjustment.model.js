// src/models/stockAdjustment.model.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('StockAdjustment', {
      adjustment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      manufacturer_part_id: DataTypes.INTEGER,
      from_project_id: DataTypes.INTEGER,
      to_project_id: DataTypes.INTEGER,
      quantity_adjusted: DataTypes.INTEGER,
      reason: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'stock_adjustments',
      timestamps: false
    });
  };
  