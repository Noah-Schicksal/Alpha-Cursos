import { Router } from 'express';
import { ModuleController } from '../controllers/moduleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const moduleRoutes = Router();
const moduleController = new ModuleController();

// rotas privadas (Instrutor)
moduleRoutes.use(authMiddleware);
moduleRoutes.use(roleMiddleware(['INSTRUCTOR']));

moduleRoutes.put('/:id', (req, res) => moduleController.update(req, res));
moduleRoutes.delete('/:id', (req, res) => moduleController.delete(req, res));

export default moduleRoutes;
