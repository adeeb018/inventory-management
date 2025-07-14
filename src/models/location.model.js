module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Location', {
      location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      rack_name: DataTypes.STRING,
      warehouse_id: DataTypes.INTEGER
    }, {
      tableName: 'locations',
      timestamps: false
    });
  };
  