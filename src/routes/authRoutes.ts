import { Router } from 'express';
import { authController, userController } from '../controllers';
import {
  validateRegister,
  validateLogin,
} from '../middlewares/validationMiddleware';

const router = Router();

router.post('/login', validateLogin, authController.login.bind(authController));
router.delete('/logout', authController.logout.bind(authController));

router.post(
  '/register/student',
  validateRegister,
  userController.registerStudent.bind(userController),
);
router.post(
  '/register/instructor',
  validateRegister,
  userController.registerInstructor.bind(userController),
);

export default router;
