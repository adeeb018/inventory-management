// src/controllers/receiptLocation.controller.js
const { ReceiptLocation, Location, PartReceipt, ManufacturerPart, Part, Manufacturer } = require('../models');

exports.createReceiptLocation = async (req, res) => {
  try {
    const { receipt_id, location_id, quantity_at_location } = req.body;

    if (!receipt_id || !location_id || !quantity_at_location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const created = await ReceiptLocation.create({
      receipt_id,
      location_id,
      quantity_at_location
    });

    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating receipt location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllReceiptLocations = async (req, res) => {
  try {
    const locations = await ReceiptLocation.findAll({
      include: [
        {
          model: PartReceipt,
          include: [
            {
              model: ManufacturerPart,
              include: [
                { model: Manufacturer },
                { model: Part }
              ]
            }
          ]
        },
        {
          model: Location
        }
      ]
    });

    res.json(locations);
  } catch (error) {
    console.error('Error fetching receipt locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
