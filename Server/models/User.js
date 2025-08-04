import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

export const createUser = async ({ email, passwordHash, companyId }) => {
  const res = await pool.query(
    `INSERT INTO users (email, password_hash, company_id) 
     VALUES ($1, $2, $3) RETURNING *`,
    [email, passwordHash, companyId]
  );
  return res.rows[0];
};
