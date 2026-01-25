import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

//rotas publicas

router.post(
  '/auth/register/student',
  userController.registerStudent.bind(userController),
);
router.post(
  '/auth/register/instructor',
  userController.registerInstructor.bind(userController),
);
router.post('/auth/login', authController.login.bind(authController));
router.delete('/auth/logout', authController.logout.bind(authController));

//rotas protegidas
router.delete(
  '/users/me',
  authMiddleware,
  userController.deleteSelf.bind(userController),
);
router.put(
  '/users/me',
  authMiddleware,
  userController.updateSelfInfos.bind(userController),
);
router.get(
  '/users/me',
  authMiddleware,
  userController.getMe.bind(userController),
);

export default router;
