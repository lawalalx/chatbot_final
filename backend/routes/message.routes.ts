import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controllers';
import protectRoutes from '../middleware/protectRoutes';

const router = express.Router();


router.get('/:id', protectRoutes, getMessages);
router.post('/send/:id', protectRoutes, sendMessage);


export default router;