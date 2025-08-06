import pool from '../config/db.js';

export const listConnections = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM connections WHERE receiver_company_id = $1 OR sender_company_id = $1',
      [req.user.company_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching connections', error: err.message });
  }
};

export const sendConnectionRequest = async (req, res) => {
  try {
    const { receiver_company_id, message } = req.body;
    const result = await pool.query(
      `INSERT INTO connections (sender_company_id, receiver_company_id, message)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.user.company_id, receiver_company_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Error sending request', error: err.message });
  }
};

export const takeConnectionAction = async (req, res) => {
  try {
    const { action, replmessage } = req.body;
    const { id } = req.params;
    await pool.query(
      `UPDATE connections SET status = $1, replmessage = $2 WHERE id = $3`,
      [action, replmessage, id]
    );
    res.json({ msg: 'Connection updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating connection', error: err.message });
  }
};