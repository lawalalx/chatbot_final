import protectRoutes from '../middleware/protectRoutes';
import express from 'express';
import { getUsersForSidebar } from '../controllers/user.controllers';

const router = express.Router();

router.get('/', protectRoutes, getUsersForSidebar);

export default router;