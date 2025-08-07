import express from 'express';
import {
  SignupCompany,
  updateCompanyProfile,
  getACompany,
  
} from '../controllers/companyController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company account and profile APIs
 */

/**
 * @swagger
 * /company/signup:
 *   post:
 *     summary: Signup a company account
 *     tags: [Company]
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
 *               - primary_category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Company name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Company email
 *               password:
 *                 type: string
 *                 description: Password for the account
 *               gstin:
 *                 type: string
 *                 description: GST Identification Number
 *               primary_category:
 *                 type: string
 *                 description: Primary business category
 *               founding_year:
 *                 type: integer
 *                 description: Year the company was founded
 *               contact:
 *                 type: string
 *                 description: Contact number
 *               business_desc:
 *                 type: string
 *                 description: Company description
 *               website:
 *                 type: string
 *                 description: Company website URL
 *               turnover:
 *                 type: string
 *                 description: Annual turnover range
 *               staff_strength:
 *                 type: string
 *                 description: Number of employees
 *               company_type:
 *                 type: string
 *                 description: Type of company (Private, Public, etc.)
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Company locations
 *               sub_categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Company sub-categories
 *     responses:
 *       201:
 *         description: Company account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 company:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request - validation errors
 *       409:
 *         description: Company already exists
 */
router.post('/signup', SignupCompany);

/**
 * @swagger
 * /company/profile/{id}:
 *   put:
 *     summary: Update company profile by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID
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
 *                 format: email
 *               business_desc:
 *                 type: string
 *               primary_category:
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
 *         description: Profile updated successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.put('/profile/:id', updateCompanyProfile);

 

/**
 * @swagger
 * /company/getACompany/{id}:
 *   get:
 *     summary: Get another company public profile (legacy endpoint)
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