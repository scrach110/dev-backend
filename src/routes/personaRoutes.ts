import { Router } from 'express';
import PersonaController from '../controllers/PersonaController';

const router = Router();

PersonaController(router);

export default router;
