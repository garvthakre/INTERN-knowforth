import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  sendMessage,
  listMessages,
} from '../controllers/messageController.js';

const router = express.Router();

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: List inbox messages/conversations
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/', authMiddleware, listMessages);

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message to another user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver_id:
 *                 type: integer
 *               message:
 *                 type: string
 *               related_connection_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post('/', authMiddleware, sendMessage);

export default router;
