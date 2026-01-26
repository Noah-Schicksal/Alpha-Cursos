import { Module } from '../entities/Module';
import { ModuleRepository } from '../repositories/moduleRepository';
import { CreateModuleDTO, UpdateModuleDTO } from '../dtos/moduleDTOs';
import { CourseRepository } from '../repositories/courseRepository';

export class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApplicationError';
    }
}

export class ModuleService {
    private moduleRepository: ModuleRepository;
    private courseRepository: CourseRepository;

    constructor(
        moduleRepository: ModuleRepository = new ModuleRepository(),
        courseRepository: CourseRepository = new CourseRepository()
    ) {
        this.moduleRepository = moduleRepository;
        this.courseRepository = courseRepository;
    }

    // cria um novo módulo associado a um curso
    async create(courseId: string, instructorId: string, data: CreateModuleDTO): Promise<Module> {
        // verifica se o curso existe
        const course = this.courseRepository.findById(courseId);
        if (!course) {
            throw new ApplicationError('Curso não encontrado');
        }

        // verifica se o usuário é o dono do curso (instrutor)
        if (course.instructorId !== instructorId) {
            throw new ApplicationError('Você não tem permissão para adicionar módulos neste curso');
        }

        // define a ordem automaticamente se não for informada
        let orderIndex = data.orderIndex;
        if (orderIndex === undefined) {
            const maxOrder = this.moduleRepository.findMaxOrderIndex(courseId);
            orderIndex = maxOrder + 1;
        }

        const module = new Module({
            title: data.title,
            courseId: courseId,
            orderIndex: orderIndex
        });

        return this.moduleRepository.save(module);
    }

    // atualiza um módulo (título ou ordem)
    async update(moduleId: string, instructorId: string, data: UpdateModuleDTO): Promise<Module> {
        const module = this.moduleRepository.findById(moduleId);
        if (!module) {
            throw new ApplicationError('Módulo não encontrado');
        }

        // precisa buscar o curso para verificar o dono
        const course = this.courseRepository.findById(module.courseId);
        if (!course || course.instructorId !== instructorId) {
            throw new ApplicationError('Você não tem permissão para editar este módulo');
        }

        // atualiza os campos permitidos
        const updatedModule = new Module({
            id: module.id,
            title: data.title ?? module.title,
            courseId: module.courseId,
            orderIndex: data.orderIndex ?? module.orderIndex,
            createdAt: module.createdAt
        });

        return this.moduleRepository.update(updatedModule);
    }

    // remove um módulo
    async delete(moduleId: string, instructorId: string): Promise<void> {
        const module = this.moduleRepository.findById(moduleId);
        if (!module) {
            throw new ApplicationError('Módulo não encontrado');
        }

        const course = this.courseRepository.findById(module.courseId);
        if (!course || course.instructorId !== instructorId) {
            throw new ApplicationError('Você não tem permissão para remover este módulo');
        }

        this.moduleRepository.delete(moduleId);
    }
}
