import express from 'express'
import { registerController, loginController } from '../controllers/authController.js'
import rateLimit from 'express-rate-limit'

// ip limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// router object
const router = express.Router()

// routes

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *     type: object
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       id:
 *         type: string
 *         example: 67c00ea3eafdcc1560085b1a
 *         description: The Auto-generated id of user collection
 *       name:
 *         type: string
 *         example: John
 *         description: User name
 *       lastName:
 *         type: string
 *         example: Doe
 *         description: User Last name
 *       email:
 *         type: string
 *         example: Johndoe@gmail.com
 *         description: User email address
 *       password:
 *         type: string
 *         example: test@gmail.com
 *         description: User password
 *       location:
 *         type: string
 *         example: Ahmadabad
 *         description: User location
 *     example:
 *       id: 67c00ea3eafdcc1560085b1a
 *       name: John
 *       lastName: Doe
 *       email: Johndoe@gmail.com
 *       password: test@gmail.com
 *       location: Ahmadabad
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

// register  || POST
router.post('/register', limiter, registerController)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login Page
 *     tags: 
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */

// Login || POST
router.post('/login', limiter, loginController)

// export
export default router