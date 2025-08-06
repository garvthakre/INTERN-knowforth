import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// 1. Signup Business
export const SignupBusiness = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gstin,
      major_category,
      founding_year,
      rep_name,
      contact,
      description,
      website,
      turnover,
      staff_strength,
      company_type,
      locations,
      sub_categories,
    } = req.body;

    // Check if email already exists
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rowCount > 0) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRes = await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [rep_name, email, hashedPassword, 'company', 'active']
    );
    const userId = userRes.rows[0].id;

    const businessRes = await pool.query(
      `INSERT INTO business (
        user_id, name, founding_year, status, contact, email, business_desc,
        primary_category, gstin, website, turnover, staff_strength,
        company_type, sub_categories, locations
      ) VALUES (
        $1, $2, $3, 'unverified', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      ) RETURNING id`,
      [
        userId,
        name,
        founding_year,
        contact,
        email,
        description,
        major_category,
        gstin,
        website,
        turnover,
        staff_strength,
        company_type,
        sub_categories,
        locations,
      ]
    );

    const businessId = businessRes.rows[0].id;
    res.status(201).json({ msg: 'Business account created', userId, businessId });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating business account', error: err.message });
  }
};

// 2. Update Profile
export const updateBusinessProfile = async (req, res) => {
  try {
    const {
      name,
      founding_year,
      contact,
      email,
      description,
      major_category,
      gstin,
      website,
      turnover,
      staff_strength,
      company_type,
      sub_categories,
      locations,
    } = req.body;

    const { id } = req.params;

    const result = await pool.query(
      `UPDATE business SET 
        name = $1,
        founding_year = $2,
        contact = $3,
        email = $4,
        business_desc = $5,
        primary_category = $6,
        gstin = $7,
        website = $8,
        turnover = $9,
        staff_strength = $10,
        company_type = $11,
        sub_categories = $12,
        locations = $13
       WHERE id = $14
       RETURNING *`,
      [
        name,
        founding_year,
        contact,
        email,
        description,
        major_category,
        gstin,
        website,
        turnover,
        staff_strength,
        company_type,
        sub_categories,
        locations,
        id,
      ]
    );

    res.status(200).json({ msg: 'Profile updated successfully', business: result.rows[0] });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating profile', error: err.message });
  }
};

// 3. Get Business by ID
export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM business WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Business not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving business', error: err.message });
  }
};