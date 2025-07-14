module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Manufacturer', {
      manufacturer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    }, {
      tableName: 'manufacturers',
      timestamps: false
    });
  };
  