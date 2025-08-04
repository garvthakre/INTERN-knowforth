import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  saveCompAddress,
  getCompAddresses,
  getACompAddress,
  updateCompAddress,
  deleteCompAddress,
} from '../controllers/addressController.js';

const router = express.Router();
/**
 * @swagger
 * /address/saveCompAddress:
 *   post:
 *     summary: Create a new company address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_type:
 *                 type: string
 *               address_line:
 *                 type: string
 *               city:
 *                 type: string
 *               state_id:
 *                 type: integer
 *               country_iso:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address created
 */
router.post('/saveCompAddress', authMiddleware, saveCompAddress);

/**
 * @swagger
 * /address/getCompAddress/{compid}:
 *   get:
 *     summary: Get all company addresses by company ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: compid
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get('/getCompAddress/:compid', getCompAddresses);

/**
 * @swagger
 * /address/getCompAAddress/{id}:
 *   get:
 *     summary: Get a single company address by ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Address details
 */
router.get('/getCompAAddress/:id', getACompAddress);

/**
 * @swagger
 * /address/updateCompAddress:
 *   put:
 *     summary: Update a company address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               address_type:
 *                 type: string
 *               address_line:
 *                 type: string
 *               city:
 *                 type: string
 *               state_id:
 *                 type: integer
 *               country_iso:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated
 */
router.put('/updateCompAddress', authMiddleware, updateCompAddress);

/**
 * @swagger
 * /address/deleteCompAddress/{id}:
 *   delete:
 *     summary: Delete a company address by ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address deleted
 */
router.delete('/deleteCompAddress/:id', authMiddleware, deleteCompAddress);

export default router;