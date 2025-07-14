const sequelize = require('../config/database');

exports.getAllReceipts = async (req, res) => {
  try {
    const [rows] = await sequelize.query(`
      SELECT * FROM part_receipts ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReceiptById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await sequelize.query(
      `SELECT * FROM part_receipts WHERE receipt_id = $1`,
      { bind: [id] }
    );
    if (rows.length === 0) return res.status(404).json({ error: "Receipt not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReceipt = async (req, res) => {
  const { manufacturer_part_id, quantity_received, received_for_project_id, created_by } = req.body;
  try {
    const [result] = await sequelize.query(`
      INSERT INTO part_receipts (manufacturer_part_id, quantity_received, received_for_project_id, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, { bind: [manufacturer_part_id, quantity_received, received_for_project_id, created_by] });

    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
