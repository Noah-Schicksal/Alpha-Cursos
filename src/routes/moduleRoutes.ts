import { Router } from 'express';
import { ModuleController } from '../controllers/moduleController';
import { ClassController } from '../controllers/classController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const moduleRoutes = Router();
const moduleController = new ModuleController();
const classController = new ClassController();

// Rotas de módulos de cursos (sub-recurso de courses)
moduleRoutes.get('/courses/:id/modules', (req, res) =>
  moduleController.listByCourse(req, res),
);
moduleRoutes.post(
  '/courses/:id/modules',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res) => moduleController.create(req, res),
);

// Operações diretas em módulos
moduleRoutes.get('/:id', (req, res) => moduleController.show(req, res));
moduleRoutes.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res) => moduleController.update(req, res),
);
moduleRoutes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res) => moduleController.delete(req, res),
);

// Sub-recurso: aulas de um módulo
moduleRoutes.post(
  '/:moduleId/classes',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res, next) => classController.create(req, res, next),
);

export default moduleRoutes;
