import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const categoryRoutes = Router();
const categoryController = new CategoryController();

// Público: Listar categorias
categoryRoutes.get('/', (req, res) => categoryController.index(req, res));

// Privado (Instrutor): Criar categoria
categoryRoutes.post(
    '/',
    authMiddleware,
    roleMiddleware(['INSTRUCTOR']),
    (req, res) => categoryController.create(req, res)
);

// Privado (Instrutor): Atualizar categoria
categoryRoutes.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['INSTRUCTOR']),
    (req, res) => categoryController.update(req, res)
);

// Privado (Instrutor): Deletar categoria
categoryRoutes.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['INSTRUCTOR']),
    (req, res) => categoryController.delete(req, res)
);

export default categoryRoutes;
