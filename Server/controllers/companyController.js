export const getACompany = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ msg: 'Company not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching company', error: err.message });
  }
};