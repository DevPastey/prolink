import express from 'express';
import { signin, signup, signout, refreshToken, getProfile, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [professional, admin]
 *                 default: professional
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/signup', signup);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user and get tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', signin);

/**
 * @openapi
 * /api/v1/auth/signout:
 *   post:
 *     summary: Clear cookies and log out user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/signout', signout);

/**
 * @openapi
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Renew Access Token using Refresh Token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: New access token generated
 */
router.post('/refresh-token', refreshToken);

/**
 * @openapi
 * /api/v1/auth/getProfile:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/getProfile', protectRoute, getProfile); // Changed to .get

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset link
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post('/forgot-password', forgotPassword); // Removed protectRoute (anonymous users use this)

/**
 * @openapi
 * /api/v1/auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using token from email
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.post('/reset-password/:token', resetPassword); // Removed protectRoute (anonymous users use this)

export default router;
