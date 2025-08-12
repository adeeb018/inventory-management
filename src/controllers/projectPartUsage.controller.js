// src/controllers/projectPartUsage.controller.js
const { ProjectPartUsage } = require('../models');

exports.getAllUsages = async (req, res) => {
  const usages = await ProjectPartUsage.findAll();
  res.json(usages);
};

exports.addUsage = async (req, res) => {
  try {
    const usage = await ProjectPartUsage.create(req.body);
    res.status(201).json(usage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createUsage = async (req, res) => {
  const { part_id, manufacturer_part_id, quantity_used, project_id } = req.body;
  const created_by = req.user.user_id;

  try {
    const usage = await ProjectPartUsage.create({
      part_id,
      manufacturer_part_id,
      quantity_used,
      project_id,
      created_by
    });

    res.status(201).json(usage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record part usage' });
  }
};

