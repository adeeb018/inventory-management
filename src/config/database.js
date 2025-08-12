const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'inventory-db', // Database name
  'postgres',     // Master username
  'Admin123', // Master password
  {
    host: 'inventory-db.c3koyyg2g0hq.ap-south-1.rds.amazonaws.com', // RDS endpoint
    dialect: 'postgres',
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
