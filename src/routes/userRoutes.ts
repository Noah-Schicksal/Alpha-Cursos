import { Router } from 'express';
import { userController } from '../controllers';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateUpdate } from '../middlewares/validationMiddleware';

const router = Router();

// Rotas protegidas do usuário - Base: /users
router.get('/me', authMiddleware, userController.getMe.bind(userController));
router.put(
  '/me',
  authMiddleware,
  validateUpdate,
  userController.updateSelfInfos.bind(userController),
);
router.delete(
  '/me',
  authMiddleware,
  userController.deleteSelf.bind(userController),
);

export default router;
