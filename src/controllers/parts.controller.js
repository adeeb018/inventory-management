const { Part } = require('../models');

exports.getAllParts = async (req, res) => {
  const parts = await Part.findAll();
  res.json(parts);
};

exports.getPartById = async (req, res) => {
  const part = await Part.findByPk(req.params.id);
  part ? res.json(part) : res.status(404).json({ error: 'Part not found' });
};

exports.createPart = async (req, res) => {
  const { part_number, description } = req.body;
  try {
    const newPart = await Part.create({ part_number, description });
    res.status(201).json(newPart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePart = async (req, res) => {
  const { part_number, description } = req.body;
  const part = await Part.findByPk(req.params.id);
  if (!part) return res.status(404).json({ error: 'Part not found' });
  await part.update({ part_number, description });
  res.json(part);
};

exports.deletePart = async (req, res) => {
  const part = await Part.findByPk(req.params.id);
  if (!part) return res.status(404).json({ error: 'Part not found' });
  await part.destroy();
  res.json({ message: 'Part deleted' });
};
