import pool from '../config/db.js';

export const saveCompPerson = async (req, res) => {
  try {
    const { name, designation, phone, email, department } = req.body;
    const result = await pool.query(
      `INSERT INTO company_personnel (company_id, name, designation, phone, email, department)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.company_id, name, designation, phone, email, department]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to save personnel', error: err.message });
  }
};

export const getCompPersons = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM company_personnel WHERE company_id = $1', [req.params.compid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving personnel', error: err.message });
  }
};

export const getACompPerson = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM company_personnel WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ msg: 'Personnel not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching personnel', error: err.message });
  }
};

export const updateCompPerson = async (req, res) => {
  try {
    const { id, name, designation, phone, email, department } = req.body;
    await pool.query(
      `UPDATE company_personnel SET name=$1, designation=$2, phone=$3, email=$4, department=$5 WHERE id=$6`,
      [name, designation, phone, email, department, id]
    );
    res.json({ msg: 'Personnel updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating personnel', error: err.message });
  }
};

export const deleteCompPerson = async (req, res) => {
  try {
    await pool.query('DELETE FROM company_personnel WHERE id = $1', [req.params.id]);
    res.json({ msg: 'Personnel deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting personnel', error: err.message });
  }
};
