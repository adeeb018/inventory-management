const { AlternatePart, ManufacturerPart } = require('../models');

exports.getAllAlternateParts = async (req, res) => {
  try {
    const all = await AlternatePart.findAll();
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alternate parts' });
  }
};

exports.getAlternatesForPart = async (req, res) => {
  const { id } = req.params;

  try {
    const alternates = await AlternatePart.findAll({
      where: { base_manufacturer_part_id: id },
      include: [
        {
          model: ManufacturerPart,
          as: 'alternatePart',
          attributes: ['manufacturer_part_id', 'manufacturer_part_number']
        }
      ]
    });

    res.json(alternates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alternates' });
  }
};
