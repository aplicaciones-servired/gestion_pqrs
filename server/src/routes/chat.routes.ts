import { getChat } from '../controllers/chat.controllers';
import { Router } from 'express';

export const ChatRouter = Router();

ChatRouter.post('/getChat', getChat);