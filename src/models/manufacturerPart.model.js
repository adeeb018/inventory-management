module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ManufacturerPart', {
      manufacturer_part_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      manufacturer_id: DataTypes.INTEGER,
      part_id: DataTypes.INTEGER,
      manufacturer_part_number: DataTypes.STRING
    }, {
      tableName: 'manufacturer_parts',
      timestamps: false
    });
  };
  