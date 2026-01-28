import { Router } from 'express';
import multer from 'multer';
import { CourseController } from '../controllers/courseController';
import { ReviewController } from '../controllers/reviewController';
import { ModuleController } from '../controllers/moduleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validateCourseCreate } from '../middlewares/validationMiddleware';

const courseRoutes = Router();
const upload = multer({ dest: 'storage/temp/' });

const courseController = new CourseController();
const reviewController = new ReviewController();
const moduleController = new ModuleController();

// --- ROTAS PÚBLICAS ---
courseRoutes.get('/', (req, res) => courseController.index(req, res));
courseRoutes.get('/:id', (req, res) => courseController.show(req, res));
courseRoutes.get('/:id/cover', (req, res) => courseController.getCover(req, res));
courseRoutes.get('/:id/modules', (req, res) => moduleController.listByCourse(req, res));
courseRoutes.get('/:id/reviews', (req, res, next) => reviewController.list(req, res, next));

// --- ROTAS PRIVADAS (Requerem Auth) ---

// Dashboard (Instrutor)
courseRoutes.get('/authored', authMiddleware, roleMiddleware(['INSTRUCTOR']), (req, res) => courseController.listAuthored(req, res));

// Reviews (Estudante)
courseRoutes.post('/:id/reviews', authMiddleware, roleMiddleware(['STUDENT']), (req, res, next) => reviewController.create(req, res, next));

// Gestão de Cursos (Instrutor / Admin)
courseRoutes.post('/', authMiddleware, roleMiddleware(['INSTRUCTOR']), upload.single('coverImage'), validateCourseCreate, (req, res) => courseController.create(req, res));
courseRoutes.post('/:id/modules', authMiddleware, roleMiddleware(['INSTRUCTOR']), (req, res) => moduleController.create(req, res));
courseRoutes.put('/:id', authMiddleware, roleMiddleware(['INSTRUCTOR']), (req, res) => courseController.update(req, res));
courseRoutes.get('/:id/students', authMiddleware, roleMiddleware(['INSTRUCTOR']), (req, res) => courseController.getStudents(req, res));

// ATUALIZADO: Rota DELETE permitindo ADMIN
courseRoutes.delete('/:id', authMiddleware, roleMiddleware(['INSTRUCTOR', 'ADMIN']), (req, res) => courseController.delete(req, res));

export default courseRoutes;