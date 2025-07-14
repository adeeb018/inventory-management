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
