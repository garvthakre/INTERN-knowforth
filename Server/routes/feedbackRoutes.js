import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  submitFeedback,
  getFeedbackTypes,
} from '../controllers/feedbackController.js';

const router = express.Router();

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Submit user feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               feedback_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback submitted
 */
router.post('/', authMiddleware, submitFeedback);

/**
 * @swagger
 * /feedback/types:
 *   get:
 *     summary: Get feedback types
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of feedback types
 */
router.get('/types', getFeedbackTypes);

export default router;