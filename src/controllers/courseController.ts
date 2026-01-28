import { Request, Response } from 'express';
import { CourseService, ApplicationError } from '../services/courseService';
import { ApiResponse } from '../utils/apiResponse';

export class CourseController {
    private courseService: CourseService;

    constructor(courseService: CourseService = new CourseService()) {
        this.courseService = courseService;
    }

    // Lista cursos (vitrine) com paginação e metadados
    async index(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string;

            const { courses, total } = await this.courseService.list(page, limit, search);
            const totalPages = Math.ceil(total / limit);

            return ApiResponse.paginated(res, courses, {
                currentPage: page,
                totalPages: totalPages,
                totalItems: total,
                itemsPerPage: limit
            });
        } catch (error) {
            return ApiResponse.error(res, 'Erro ao listar cursos', 500);
        }
    }

    // Lista cursos criados pelo instrutor logado (dashboard)
    async listAuthored(req: Request, res: Response) {
        try {
            const instructorId = req.user.id;
            const courses = await this.courseService.listByInstructor(instructorId);
            return ApiResponse.success(res, courses);
        } catch (error) {
            if (error instanceof ApplicationError) {
                return ApiResponse.error(res, error.message);
            }
            return ApiResponse.error(res, 'Erro ao listar cursos do instrutor', 500);
        }
    }

    // Exibe detalhes de um único curso
    async show(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const course = await this.courseService.getById(id);
            return ApiResponse.success(res, course);
        } catch (error) {
            if (error instanceof ApplicationError) {
                return ApiResponse.notFound(res, error.message);
            }
            return ApiResponse.error(res, 'Erro ao buscar curso', 500);
        }
    }

    // Cria um novo curso
    async create(req: Request, res: Response) {
        try {
            const instructorId = req.user.id;
            const course = await this.courseService.create(req.body, instructorId);

            if ((req as any).file) {
                const { StorageService } = require('../services/storageService');
                const storageService = new StorageService();
                try {
                    const coverUrl = await storageService.uploadCourseCover(course.id, (req as any).file, instructorId);
                    course.setCoverImageUrl(coverUrl);
                } catch (uploadError: any) {
                    console.error('Failed to upload cover image:', uploadError);
                    return ApiResponse.created(res, course, 'Curso criado, mas falha no upload da imagem: ' + uploadError.message);
                }
            }

            return ApiResponse.created(res, course.toJSON(), 'Curso criado com sucesso');
        } catch (error: any) {
            return ApiResponse.error(res, error.message || 'Erro ao criar curso');
        }
    }

    // Atualiza um curso existente
    async update(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const instructorId = req.user.id;
            const course = await this.courseService.update(id, req.body, instructorId);
            return ApiResponse.success(res, course, 'Curso atualizado com sucesso');
        } catch (error: any) {
            if (error instanceof ApplicationError) {
                if (error.message.includes('não encontrado')) return ApiResponse.notFound(res, error.message);
                if (error.message.includes('permissão')) return ApiResponse.forbidden(res, error.message);
            }
            return ApiResponse.error(res, error.message || 'Erro ao atualizar curso');
        }
    }

    // REMOVE CURSO (UNIFICADO E ATUALIZADO)
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = req.user; // Contém id e role injetados pelo authMiddleware

            if (!user) {
                return ApiResponse.error(res, 'Usuário não autenticado', 401);
            }

            // 1. Lógica de Arquivos (Storage): Busca o curso para remover a pasta física
            const course = await this.courseService.getById(id);
            if (course) {
                const { StorageService } = require('../services/storageService');
                const storageService = new StorageService();
                // Remove a pasta baseada no título (ou lógica interna do seu storage)
                await storageService.deleteCourseFolder(course.title);
            }

            // 2. Lógica de Banco: Chama o serviço passando o usuário completo (ID e ROLE)
            // O Service agora decide se deleta (se for ADMIN ou se o ID do instrutor bater)
            await this.courseService.delete(id, user);

            return ApiResponse.noContent(res);
        } catch (error: any) {
            if (error instanceof ApplicationError) {
                if (error.message.includes('permissão')) return ApiResponse.forbidden(res, error.message);
                return ApiResponse.notFound(res, error.message);
            }
            return ApiResponse.error(res, error.message || 'Erro ao remover curso', 500);
        }
    }

    // Lista os estudantes de um curso
    async getStudents(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const instructorId = req.user.id;
            const students = await this.courseService.getStudents(id, instructorId);
            return ApiResponse.success(res, students);
        } catch (error: any) {
            if (error instanceof ApplicationError) {
                if (error.message.includes('permissão')) return ApiResponse.forbidden(res, error.message);
                return ApiResponse.notFound(res, error.message);
            }
            return ApiResponse.error(res, 'Erro ao listar alunos', 500);
        }
    }

    // GET /courses/:id/cover
    async getCover(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const course = await this.courseService.getById(id);

            if (!course || !course.coverImageUrl) {
                return ApiResponse.notFound(res, 'Imagem de capa não encontrada');
            }

            const path = require('path');
            const fs = require('fs');
            const relativePath = course.coverImageUrl.startsWith('/') || course.coverImageUrl.startsWith('\\')
                ? course.coverImageUrl.substring(1)
                : course.coverImageUrl;

            const fullPath = path.resolve(process.cwd(), relativePath);

            if (!fs.existsSync(fullPath)) {
                return ApiResponse.notFound(res, 'Arquivo de imagem não encontrado no servidor');
            }

            res.sendFile(fullPath);
        } catch (error) {
            return ApiResponse.error(res, 'Erro ao obter imagem de capa', 500);
        }
    }
}