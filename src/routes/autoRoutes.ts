import { Router } from 'express';
import autoController from '../controllers/AutoController';

const router = Router();

autoController(router);

export default router;
