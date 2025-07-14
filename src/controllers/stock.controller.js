const { sequelize } = require('../models');

// Get summary of current stock by manufacturer part
exports.getManufacturerPartStock = async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM manufacturer_part_stock ORDER BY part_number');
    res.json(results);
  } catch (err) {
    console.error('Error fetching manufacturer stock:', err);
    res.status(500).json({ error: 'Failed to fetch manufacturer stock' });
  }
};

// Get stock breakdown by location
exports.getLocationStock = async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM location_stock ORDER BY warehouse_name, location_name');
    res.json(results);
  } catch (err) {
    console.error('Error fetching location stock:', err);
    res.status(500).json({ error: 'Failed to fetch location stock' });
  }
};
