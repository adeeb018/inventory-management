module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PartReceipt', {
      receipt_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      manufacturer_part_id: DataTypes.INTEGER,
      quantity_received: DataTypes.INTEGER,
      received_for_project_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE
    }, {
      tableName: 'part_receipts',
      timestamps: false
    });
  };
  