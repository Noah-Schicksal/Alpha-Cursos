import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/categoryRepository';

export class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApplicationError';
    }
}

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository = new CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    }

    async create(name: string): Promise<Category> {
        const exists = this.categoryRepository.findByName(name);
        if (exists) {
            throw new ApplicationError('Já existe uma categoria com este nome');
        }

        const newCategory = new Category({ name });
        return this.categoryRepository.save(newCategory);
    }

    async list(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    async update(id: string, name: string): Promise<Category> {
        const category = this.categoryRepository.findById(id);
        if (!category) {
            throw new ApplicationError('Categoria não encontrada');
        }

        const existingCategory = this.categoryRepository.findByName(name);
        if (existingCategory && existingCategory.id !== id) {
            throw new ApplicationError('Já existe uma categoria com este nome');
        }

        return this.categoryRepository.update(id, name);
    }

    async delete(id: string): Promise<void> {
        const category = this.categoryRepository.findById(id);
        if (!category) {
            throw new ApplicationError('Categoria não encontrada');
        }

        this.categoryRepository.delete(id);
    }
}
