import pool from '../config/db.js';

export const saveCompAddress = async (req, res) => {
  try {
    const { address_type, address_line, city, state_id, country_iso, pincode } = req.body;
    const result = await pool.query(
      `INSERT INTO company_addresses (company_id, address_type, address_line, city, state_id, country_iso, pincode)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user.company_id, address_type, address_line, city, state_id, country_iso, pincode]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to save address', error: err.message });
  }
};

export const getCompAddresses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM company_addresses WHERE company_id = $1', [req.params.compid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving addresses', error: err.message });
  }
};

export const getACompAddress = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM company_addresses WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ msg: 'Address not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching address', error: err.message });
  }
};

export const updateCompAddress = async (req, res) => {
  try {
    const { id, address_type, address_line, city, state_id, country_iso, pincode } = req.body;
    await pool.query(
      `UPDATE company_addresses SET address_type=$1, address_line=$2, city=$3, state_id=$4,
        country_iso=$5, pincode=$6 WHERE id=$7`,
      [address_type, address_line, city, state_id, country_iso, pincode, id]
    );
    res.json({ msg: 'Address updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating address', error: err.message });
  }
};

export const deleteCompAddress = async (req, res) => {
  try {
    await pool.query('DELETE FROM company_addresses WHERE id = $1', [req.params.id]);
    res.json({ msg: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting address', error: err.message });
  }
};
