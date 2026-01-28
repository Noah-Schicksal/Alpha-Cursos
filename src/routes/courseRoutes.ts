import { Router } from 'express';
import { CourseController } from '../controllers/courseController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

import multer from 'multer';
import { validateCourseCreate } from '../middlewares/validationMiddleware';

// Multer config for course covers (using temp Storage first)
const upload = multer({ dest: 'storage/temp/' });

const courseRoutes = Router();
const courseController = new CourseController();

// rotas públicas
courseRoutes.get('/', (req, res) => courseController.index(req, res));

// Rota de dashboard de instrutor (precisa vir antes de /:id para não conflitar)
courseRoutes.get(
  '/authored',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res) => courseController.listAuthored(req, res),
);

courseRoutes.get('/:id', (req, res) => courseController.show(req, res));
courseRoutes.get('/:id/cover', (req, res) =>
  courseController.getCover(req, res),
);

// rotas privadas (apenas instrutores)
courseRoutes.post(
  '/',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  upload.single('coverImage'),
  validateCourseCreate,
  (req, res) => courseController.create(req, res),
);
courseRoutes.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res) => courseController.update(req, res),
);
courseRoutes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res) => courseController.delete(req, res),
);
courseRoutes.get(
  '/:id/students',
  authMiddleware,
  roleMiddleware(['INSTRUCTOR']),
  (req, res) => courseController.getStudents(req, res),
);

export default courseRoutes;
