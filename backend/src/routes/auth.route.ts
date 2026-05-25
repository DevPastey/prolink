import express from 'express';
import { signin } from '../controllers/auth.controller.js';
import { signup } from '../controllers/auth.controller.js';
import { signout } from '../controllers/auth.controller.js';
import { refreshToken } from '../controllers/auth.controller.js';
import { profile } from '../controllers/auth.controller.js';
import { forgotPassword } from '../controllers/auth.controller.js';
import { resetPassword } from '../controllers/auth.controller.js';


const router = express.Router();


router.post('/login', signin)
router.post('/signup', signup)
router.post('/signout', signout)
router.post('/refresh-token', refreshToken)
router.post('/profile', profile)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router;