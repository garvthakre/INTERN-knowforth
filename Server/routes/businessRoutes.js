import express from 'express';
import {
  SignupBusiness,
  updateBusinessProfile,
  getBusinessById,
} from '../controllers/businessController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business account and profile APIs
 */

/**
 * @swagger
 * /business/signup:
 *   post:
 *     summary: Signup a business account
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - gstin
 *               - major_category
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               gstin:
 *                 type: string
 *               major_category:
 *                 type: string
 *               rep_name:
 *                 type: string
 *               founding_year:
 *                 type: integer
 *               contact:
 *                 type: string
 *               description:
 *                 type: string
 *               website:
 *                 type: string
 *               turnover:
 *                 type: string
 *               staff_strength:
 *                 type: string
 *               company_type:
 *                 type: string
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *               sub_categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Business account created
 */
router.post('/signup', SignupBusiness);

/**
 * @swagger
 * /business/profile/{id}:
 *   put:
 *     summary: Update business profile by ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               founding_year:
 *                 type: integer
 *               contact:
 *                 type: string
 *               email:
 *                 type: string
 *               description:
 *                 type: string
 *               major_category:
 *                 type: string
 *               gstin:
 *                 type: string
 *               website:
 *                 type: string
 *               turnover:
 *                 type: string
 *               staff_strength:
 *                 type: string
 *               company_type:
 *                 type: string
 *               sub_categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/profile/:id', updateBusinessProfile);

/**
 * @swagger
 * /business/{id}:
 *   get:
 *     summary: Get business profile by ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Business found
 */
router.get('/:id', getBusinessById);

export default router;