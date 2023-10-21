import { Router } from 'express';
const router = Router();
import { register } from '../controllers/UserController.js';

router.post('/register',register);
export default router;    