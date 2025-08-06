import pool from '../config/db.js';

export const getBusinessCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category_master');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching categories', error: err.message });
  }
};

export const getBusinessTypes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM business_type_master');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching types', error: err.message });
  }
};

export const getCompanyTypes = async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT company_type FROM companies');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching types', error: err.message });
  }
};

export const getCountries = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM country_master');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching countries', error: err.message });
  }
};

export const getStates = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM state_master WHERE country_iso_code = $1', [req.params.countryid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching states', error: err.message });
  }
};
