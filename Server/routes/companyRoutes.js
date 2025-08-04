import express from 'express';
import { getACompany } from '../controllers/companyController.js';

const router = express.Router();

/**
 * @swagger
 * /company/getACompany/{id}:
 *   get:
 *     summary: Get another company public profile
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Not found
 */
router.get('/getACompany/:id', getACompany);

export default router;