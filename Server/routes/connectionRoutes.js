import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  listConnections,
  sendConnectionRequest,
  takeConnectionAction,
} from '../controllers/connectionController.js';

const router = express.Router();

/**
 * @swagger
 * /connections:
 *   get:
 *     summary: List connection requests for logged-in user
 *     tags: [Connections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of connection requests
 */
router.get('/', authMiddleware, listConnections);

/**
 * @swagger
 * /connections:
 *   post:
 *     summary: Send a connection request
 *     tags: [Connections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver_company_id:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Connection request sent
 */
router.post('/', authMiddleware, sendConnectionRequest);

/**
 * @swagger
 * /connections/{id}:
 *   put:
 *     summary: Accept or reject a connection request
 *     tags: [Connections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [accepted, rejected]
 *               replmessage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connection status updated
 */
router.put('/:id', authMiddleware, takeConnectionAction);

export default router;