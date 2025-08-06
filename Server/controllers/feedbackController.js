import pool from '../config/db.js';

export const submitFeedback = async (req, res) => {
  try {
    const { message, feedback_type } = req.body;
    await pool.query(
      `INSERT INTO feedback (user_id, company_id, message)
       VALUES ($1, $2, $3)`,
      [req.user.id, req.user.company_id, message]
    );
    res.status(201).json({ msg: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting feedback', error: err.message });
  }
};

export const getFeedbackTypes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback_type_master');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching types', error: err.message });
  }
};
