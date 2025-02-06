import { Router } from 'express';
import { getChat } from '../controllers/chat.controllers';

export const ChatRouter = Router();

ChatRouter.post('/getChat', getChat)