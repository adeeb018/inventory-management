// src/controllers/stockAdjustment.controller.js
const { StockAdjustment } = require('../models');

exports.getAllAdjustments = async (req, res) => {
  const adjustments = await StockAdjustment.findAll();
  res.json(adjustments);
};

exports.createAdjustment = async (req, res) => {
  try {
    const adjustment = await StockAdjustment.create(req.body);
    res.status(201).json(adjustment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
