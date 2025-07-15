const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import model definitions
const ReceiptLocation = require('./receiptLocation.model')(sequelize, DataTypes);
const PartReceipt = require('./partReceipt.model')(sequelize, DataTypes);
const ManufacturerPart = require('./manufacturerPart.model')(sequelize, DataTypes);
const Part = require('./part.model')(sequelize, DataTypes);
const Manufacturer = require('./manufacturer.model')(sequelize, DataTypes);
const Location = require('./location.model')(sequelize, DataTypes);
const Project = require('./project.model')(sequelize, DataTypes);
const ProjectPartUsage = require('./projectPartUsage.model')(sequelize, DataTypes)
const StockAdjustment = require('./stockAdjustment.model')(sequelize, DataTypes);
const AlternatePart = require('./alternatePart.model')(sequelize, DataTypes);


// Define associations
PartReceipt.belongsTo(ManufacturerPart, { foreignKey: 'manufacturer_part_id' });
PartReceipt.hasMany(ReceiptLocation, { foreignKey: 'receipt_id' });

ManufacturerPart.belongsTo(Manufacturer, { foreignKey: 'manufacturer_id' });
ManufacturerPart.belongsTo(Part, { foreignKey: 'part_id' });

ReceiptLocation.belongsTo(Location, { foreignKey: 'location_id' });
ReceiptLocation.belongsTo(PartReceipt, { foreignKey: 'receipt_id' });

ProjectPartUsage.belongsTo(Project, { foreignKey: 'project_id' });

ProjectPartUsage.belongsTo(ManufacturerPart, { foreignKey: 'manufacturer_part_id' });
ManufacturerPart.hasMany(ProjectPartUsage, { foreignKey: 'manufacturer_part_id' });

ProjectPartUsage.belongsTo(Part, { foreignKey: 'part_id' });
Part.hasMany(ProjectPartUsage, { foreignKey: 'part_id' });

ManufacturerPart.hasMany(StockAdjustment, { foreignKey: 'manufacturer_part_id' });
StockAdjustment.belongsTo(ManufacturerPart, { foreignKey: 'manufacturer_part_id' });

AlternatePart.belongsTo(ManufacturerPart, {
  foreignKey: 'alternate_manufacturer_part_id',
  as: 'alternatePart'
});


module.exports = {
  sequelize,
  Project,
  ReceiptLocation,
  PartReceipt,
  ManufacturerPart,
  Part,
  Manufacturer,
  Location,
  ProjectPartUsage,
  StockAdjustment,
  AlternatePart,
};
