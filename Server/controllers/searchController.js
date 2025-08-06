import pool from '../config/db.js';

export const searchBusiness = async (req, res) => {
  try {
    const { criteria } = req.body;

    // Store search activity
    await pool.query(
      'INSERT INTO search_criteria_details (user_id, criteria) VALUES ($1, $2)',
      [req.user.id, criteria]
    );

    // Perform actual business search
    const result = await pool.query(
      `SELECT * FROM companies WHERE name ILIKE $1 OR business_desc ILIKE $1`,
      [`%${criteria}%`]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Search failed', error: err.message });
  }
};
