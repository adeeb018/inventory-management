const sequelize = require('../config/database');

exports.createManufacturerPart = async (req, res) => {
  const { manufacturer_id, part_id, manufacturer_part_number } = req.body;
  try {
    const [result] = await sequelize.query(
      `INSERT INTO manufacturer_parts (manufacturer_id, part_id, manufacturer_part_number)
       VALUES ($1, $2, $3) RETURNING *`,
      { bind: [manufacturer_id, part_id, manufacturer_part_number] }
    );
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllManufacturerParts = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `SELECT mp.*, m.name AS manufacturer_name, p.part_number 
       FROM manufacturer_parts mp
       JOIN manufacturers m ON m.manufacturer_id = mp.manufacturer_id
       JOIN parts p ON p.part_id = mp.part_id`
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getManufacturerPartById = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `SELECT mp.*, m.name AS manufacturer_name, p.part_number 
       FROM manufacturer_parts mp
       JOIN manufacturers m ON m.manufacturer_id = mp.manufacturer_id
       JOIN parts p ON p.part_id = mp.part_id
       WHERE manufacturer_part_id = $1`,
      { bind: [req.params.id] }
    );
    if (result.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateManufacturerPart = async (req, res) => {
  const { manufacturer_id, part_id, manufacturer_part_number } = req.body;
  try {
    const [result] = await sequelize.query(
      `UPDATE manufacturer_parts 
       SET manufacturer_id = $1, part_id = $2, manufacturer_part_number = $3 
       WHERE manufacturer_part_id = $4 RETURNING *`,
      { bind: [manufacturer_id, part_id, manufacturer_part_number, req.params.id] }
    );
    if (result.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteManufacturerPart = async (req, res) => {
  try {
    await sequelize.query(
      `DELETE FROM manufacturer_parts WHERE manufacturer_part_id = $1`,
      { bind: [req.params.id] }
    );
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get usage of a manufacturer part across projects
// Get usage of a manufacturer part across all projects
exports.getPartUsageByManufacturerPartId = async (req, res) => {
    const { ManufacturerPart, ProjectPartUsage, Project } = require('../models');
    const partId = req.params.id;
  
    try {
      // Check if the manufacturer part exists
      const partExists = await ManufacturerPart.findByPk(partId);
      if (!partExists) {
        return res.status(404).json({ error: 'Manufacturer part not found' });
      }
  
      // Get usage details
      const usageData = await ProjectPartUsage.findAll({
        where: { manufacturer_part_id: partId },
        include: [{
          model: Project,
          attributes: ['project_id', 'name']
        }],
        attributes: ['quantity_used']
      });
  
      const result = usageData.map(record => ({
        project_id: record.Project.project_id,
        project_name: record.Project.name,
        quantity_used: record.quantity_used
      }));
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching usage data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  