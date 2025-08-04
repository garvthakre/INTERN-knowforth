import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/User.js';
import pool from '../config/db.js';

export const register = async (req, res) => {
  const { email, password, companyId } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ msg: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await createUser({ email, passwordHash, companyId });

  res.status(201).json(newUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ msg: 'Incorrect password' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
};

export const activateUser = async (req, res) => {
  const { user_id, token } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM activation_tokens WHERE user_id = $1 AND token = $2 AND is_used = false',
      [user_id, token]
    );
    if (result.rowCount === 0) return res.status(400).json({ msg: 'Invalid token or already used' });

    await pool.query('UPDATE users SET is_active = true WHERE id = $1', [user_id]);
    await pool.query('UPDATE activation_tokens SET is_used = true WHERE user_id = $1', [user_id]);

    res.json({ msg: 'User activated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userRes.rowCount === 0) return res.status(404).json({ msg: 'User not found' });

    const token = Math.random().toString(36).substring(2, 15);
    await pool.query(
      'INSERT INTO activation_tokens (user_id, token) VALUES ($1, $2)',
      [userRes.rows[0].id, token]
    );

    // (In production, send this token via email)
    res.json({ msg: 'Reset token created', token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};