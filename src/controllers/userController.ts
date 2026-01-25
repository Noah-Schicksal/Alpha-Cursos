import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { ApiResponse } from '../utils/apiResponse';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async registerStudent(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      // Força a role STUDENT
      const user = await this.userService.create({
        name,
        email,
        password,
        role: 'STUDENT',
      });

      return ApiResponse.created(
        res,
        user.toJSON(),
        'Estudante registrado com sucesso',
      );
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  async registerInstructor(req: Request, res: Response) {
    const { name, email, password } = req.body;

    //em um sistema real, aqui teria que ter uma verificação se quem está criando é um ADMIN master,
    //mas como pedido, é uma rota pública de registro de admin.

    try {
      // Força a role INSTRUCTOR
      const user = await this.userService.create({
        name,
        email,
        password,
        role: 'INSTRUCTOR',
      });

      return ApiResponse.created(
        res,
        user.toJSON(),
        'Instrutor registrado com sucesso',
      );
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any) {
    if (
      error.message.includes('Regra de Negócio') ||
      error.message.includes('Proibido')
    ) {
      return ApiResponse.forbidden(res, error.message);
    }
    if (
      error.message.includes('Conflito') ||
      error.message.includes('duplicidade')
    ) {
      return ApiResponse.conflict(res, error.message);
    }
    return ApiResponse.error(res, error.message);
  }

  async deleteSelf(req: Request, res: Response) {
    const requesterId = req.user.id;

    try {
      await this.userService.delete({
        userIdToDelete: requesterId,
        requesterId,
      });
      return ApiResponse.noContent(res);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  async updateSelfInfos(req: Request, res: Response) {
    const requesterId = req.user.id;
    const { name, email, password } = req.body;

    try {
      const updatedUser = await this.userService.update(requesterId, {
        name,
        email,
        password,
      });
      return ApiResponse.success(
        res,
        updatedUser.toJSON(),
        'Perfil atualizado com sucesso',
      );
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }
  async getMe(req: Request, res: Response) {
    const requesterId = req.user.id;

    try {
      const user = await this.userService.findById(requesterId);
      return ApiResponse.success(res, user.toJSON());
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }
}
