// src/models/part.model.js
module.exports = (sequelize, DataTypes) => {
  const Part = sequelize.define('Part', {
    part_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    part_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    part_type: DataTypes.STRING
  }, {
    tableName: 'parts',
    timestamps: false
  });

  return Part;
};
