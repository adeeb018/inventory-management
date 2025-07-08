const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Part = sequelize.define('Part', {
  part_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  part_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'parts',
  timestamps: false,
});

module.exports = Part;
