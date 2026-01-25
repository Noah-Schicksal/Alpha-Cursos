import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { ApiResponse } from '../utils/apiResponse';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new AuthService();

    try {
      const result = await service.login({ email, password });

      // Define o cookie httpOnly com o token
      const isProduction = process.env.NODE_ENV === 'production';

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 3600000, // 1 hora
      });

      // Retorna apenas os dados do usuário (token não vai no body)
      return ApiResponse.success(
        res,
        result.user,
        'Login realizado com sucesso',
      );
    } catch (error: any) {
      // Se for erro de credenciais, retornamos 401 Unauthorized
      if (error.message === 'Email ou senha incorretos.') {
        return ApiResponse.unauthorized(res, error.message);
      }

      // Outros erros
      return ApiResponse.error(res, error.message);
    }
  }

  async logout(req: Request, res: Response) {
    // Limpa o cookie httpOnly
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });

    return ApiResponse.success(res, null, 'Logout realizado com sucesso');
  }
}
