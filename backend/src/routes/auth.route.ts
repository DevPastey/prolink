import express from 'express';
import { signin } from '../controllers/auth.controller.js';
import { signup } from '../controllers/auth.controller.js';
import { signout } from '../controllers/auth.controller.js';
import { refreshToken } from '../controllers/auth.controller.js';
import { getProfile } from '../controllers/auth.controller.js';
import { forgotPassword } from '../controllers/auth.controller.js';
import { resetPassword } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post('/login', signin)
router.post('/signup', signup)
router.post('/signout', signout)
router.post('/refresh-token', refreshToken)
router.post('/getProfile', protectRoute, getProfile)
router.post('/forgot-password', protectRoute, forgotPassword)
router.post('/reset-password', protectRoute, resetPassword)

export default router;