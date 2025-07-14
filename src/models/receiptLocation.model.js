module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ReceiptLocation', {
      receipt_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      receipt_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity_at_location: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'receipt_locations',
      timestamps: false
    });
  };
  