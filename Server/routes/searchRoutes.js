import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { searchBusiness } from '../controllers/searchController.js';

const router = express.Router();

/**
 * @swagger
 * /search/business:
 *   post:
 *     summary: Search businesses by category, location, etc.
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               criteria:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of matching companies
 */
router.post('/business', authMiddleware, searchBusiness);

export default router;