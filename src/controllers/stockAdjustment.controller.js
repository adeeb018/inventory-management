// src/controllers/stockAdjustment.controller.js
const { StockAdjustment, ManufacturerPart } = require('../models');

exports.getAllAdjustments = async (req, res) => {
  try {
    const adjustments = await StockAdjustment.findAll();
    res.json(adjustments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch adjustments' });
  }
};

exports.getAdjustmentById = async (req, res) => {
  try {
    const adjustment = await StockAdjustment.findByPk(req.params.id);
    if (!adjustment) return res.status(404).json({ error: 'Adjustment not found' });
    res.json(adjustment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch adjustment' });
  }
};

exports.createAdjustment = async (req, res) => {
  const { manufacturer_part_id, quantity_adjusted, reason, from_project_id, to_project_id } = req.body;
  const created_by = req.user.user_id;

  try {
    const adjustment = await StockAdjustment.create({
      manufacturer_part_id,
      quantity_adjusted,
      reason,
      from_project_id,
      to_project_id,
      created_by
    });

    res.status(201).json(adjustment);
  } catch (error) {
    console.error('Error creating stock adjustment:', error);
    res.status(500).json({ error: 'Failed to create adjustment' });
  }
};


exports.updateAdjustment = async (req, res) => {
  try {
    const adjustment = await StockAdjustment.findByPk(req.params.id);
    if (!adjustment) return res.status(404).json({ error: 'Adjustment not found' });

    const { quantity_adjusted, reason } = req.body;
    adjustment.quantity_adjusted = quantity_adjusted;
    adjustment.reason = reason;
    await adjustment.save();

    res.json(adjustment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update adjustment' });
  }
};

exports.deleteAdjustment = async (req, res) => {
  try {
    const adjustment = await StockAdjustment.findByPk(req.params.id);
    if (!adjustment) return res.status(404).json({ error: 'Adjustment not found' });
    await adjustment.destroy();
    res.json({ message: 'Adjustment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete adjustment' });
  }
};
