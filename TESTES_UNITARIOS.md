# 🧪 Documentação de Testes Unitários

![Status](https://img.shields.io/badge/Testes-Configurados-success)
![Coverage](https://img.shields.io/badge/Coverage-Iniciado-blue)

Documentação completa sobre os testes unitários do projeto, com foco em cobertura de serviços, padrões de teste e execução.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura de Testes](#arquitetura-de-testes)
3. [Testes Implementados](#testes-implementados)
   - [CategoryService](#categoryservice)
   - [CourseService](#courseservice)
4. [Como Executar](#como-executar)
5. [Boas Práticas](#boas-práticas)
6. [Padrão AAA (Arrange-Act-Assert)](#padrão-aaa)
7. [Mocks e Fixtures](#mocks-e-fixtures)

---

## 🎯 Visão Geral

O projeto implementa testes unitários utilizando **Jest**, um framework de testes robusto e popular na comunidade Node.js/TypeScript. Os testes focam em **isolar componentes individuais** (especialmente Services e Repositories) testando sua lógica de negócio sem dependências externas.

### Benefícios dos Testes Unitários

✅ **Confiança no Código**: Detecta regressões rapidamente  
✅ **Refatoração Segura**: Permite mudanças com confiança  
✅ **Documentação Viva**: Testes descrevem o comportamento esperado  
✅ **Debug Facilitado**: Isolamento de problemas  
✅ **Qualidade**: Força melhor design e separação de responsabilidades  

---

## 🏗️ Arquitetura de Testes

### Estrutura de Diretórios

```
tests/
├── setup/
│   └── testSetup.ts                     # Configuração global de testes
├── mocks/
│   └── mockRepositories.ts              # Mocks reutilizáveis
├── unit/
│   └── services/
│       ├── authService.test.ts          # Testes do AuthService
│       ├── categoryService.test.ts      # Testes do CategoryService (11 testes)
│       ├── courseService.test.ts        # Testes do CourseService (22 testes)
│       └── TEMPLATE.test.ts             # Template para novos testes
├── jest.d.ts                            # Tipos globais do Jest
└── tsconfig.json                        # Configuração TypeScript para testes
```

### Arquivo de Configuração: `jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',              // Usa ts-jest para compilar TS
  testEnvironment: 'node',         // Ambiente de execução: Node.js
  roots: ['<rootDir>/tests'],      // Diretório raiz dos testes
  testMatch: ['**/*.test.ts'],     // Padrão de arquivos de teste
  setupFilesAfterEnv: ['<rootDir>/tests/setup/testSetup.ts'],
  clearMocks: true,                // Limpa mocks após cada teste
  resetMocks: true,                // Reseta mocks após cada teste
  restoreMocks: true,              // Restaura mocks originais
};
```

### Setup Global: `tests/setup/testSetup.ts`

Arquivo executado antes de todos os testes, responsável por:
- Configurar variáveis de ambiente para testes
- Desabilitar logs do console em testes
- Inicializar fixtures globais

```typescript
// Desabilita console.log em testes para saída limpa
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: console.warn,    // Mantém warnings
  error: console.error,  // Mantém erros
};

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_secret_key';
  process.env.JWT_EXPIRES_IN = '1h';
});
```

---

## ✅ Testes Implementados

| Serviço | Arquivo | Total de Testes | Cobertura | Status |
|---------|---------|-----------------|-----------|--------|
| **CategoryService** | `categoryService.test.ts` | 11 | 100% | ✅ Pass |
| **CourseService** | `courseService.test.ts` | 22 | 100% | ✅ Pass |
| **AuthService** | `authService.test.ts` | (existente) | - | 🔧 WIP |

---

### CategoryService Tests

**Arquivo**: `tests/unit/services/categoryService.test.ts`

**Descrição**: Testes unitários do serviço de categorias, responsável pela lógica de negócio de criar, listar, atualizar e deletar categorias.

#### Teste 1: `create` - Criar Categoria

**Cenário 1.1**: Criar nova categoria com sucesso
```typescript
it('should create a new category when name does not exist', async () => {
  // Arrange
  const categoryName = 'New Category';
  mockCategoryRepository.findByName.mockReturnValue(null);
  mockCategoryRepository.save.mockReturnValue(
    new Category({ id: '123', name: categoryName }),
  );

  // Act
  const result = await categoryService.create(categoryName);

  // Assert
  expect(result).toEqual(
    expect.objectContaining({
      id: '123',
      name: categoryName,
    }),
  );
  expect(mockCategoryRepository.findByName).toHaveBeenCalledWith(categoryName);
  expect(mockCategoryRepository.save).toHaveBeenCalled();
});
```

**O que testa**:
- ✅ Validação de categoria duplicada (findByName é chamado)
- ✅ Salvamento de nova categoria (save é chamado)
- ✅ Retorno de categoria criada com ID e nome corretos

**Cenário 1.2**: Erro ao duplicar nome
```typescript
it('should throw ApplicationError when category name already exists', async () => {
  // Arrange
  const categoryName = 'Test Category';
  mockCategoryRepository.findByName.mockReturnValue(mockCategory);

  // Act & Assert
  await expect(categoryService.create(categoryName)).rejects.toThrow(
    new ApplicationError('Já existe uma categoria com este nome'),
  );

  expect(mockCategoryRepository.findByName).toHaveBeenCalledWith(categoryName);
  expect(mockCategoryRepository.save).not.toHaveBeenCalled();
});
```

**O que testa**:
- ✅ Rejeita categoria com nome duplicado
- ✅ Lança ApplicationError com mensagem correta
- ✅ Não chama save quando duplicata é detectada

---

#### Teste 2: `list` - Listar Categorias

**Cenário 2.1**: Listar todas as categorias
```typescript
it('should return all categories', async () => {
  // Arrange
  const categories = [mockCategory, mockCategoryTwo];
  mockCategoryRepository.findAll.mockReturnValue(categories);

  // Act
  const result = await categoryService.list();

  // Assert
  expect(result).toEqual(categories);
  expect(mockCategoryRepository.findAll).toHaveBeenCalled();
});
```

**O que testa**:
- ✅ Retorna lista de categorias
- ✅ Chama findAll do repositório exatamente uma vez

**Cenário 2.2**: Listar quando vazio
```typescript
it('should return empty array when no categories exist', async () => {
  // Arrange
  mockCategoryRepository.findAll.mockReturnValue([]);

  // Act
  const result = await categoryService.list();

  // Assert
  expect(result).toEqual([]);
  expect(mockCategoryRepository.findAll).toHaveBeenCalled();
});
```

**O que testa**:
- ✅ Retorna array vazio quando nenhuma categoria existe
- ✅ Não lança erro em lista vazia

---

#### Teste 3: `update` - Atualizar Categoria

**Cenário 3.1**: Atualizar com sucesso
```typescript
it('should update category when it exists and new name is unique', async () => {
  // Arrange
  const categoryId = '123e4567-e89b-12d3-a456-426614174000';
  const newName = 'Updated Category';
  const updatedCategory = new Category({ id: categoryId, name: newName });

  mockCategoryRepository.findById.mockReturnValue(mockCategory);
  mockCategoryRepository.findByName.mockReturnValue(null);
  mockCategoryRepository.update.mockReturnValue(updatedCategory);

  // Act
  const result = await categoryService.update(categoryId, newName);

  // Assert
  expect(result).toEqual(updatedCategory);
  expect(mockCategoryRepository.update).toHaveBeenCalledWith(categoryId, newName);
});
```

**O que testa**:
- ✅ Verifica existência da categoria a atualizar
- ✅ Verifica unicidade do novo nome
- ✅ Chama update com ID e novo nome corretos

**Cenário 3.2**: Erro - categoria não encontrada
```typescript
it('should throw ApplicationError when category does not exist', async () => {
  // Arrange
  const categoryId = 'non-existent-id';
  const newName = 'Updated Category';
  mockCategoryRepository.findById.mockReturnValue(null);

  // Act & Assert
  await expect(categoryService.update(categoryId, newName)).rejects.toThrow(
    new ApplicationError('Categoria não encontrada'),
  );

  expect(mockCategoryRepository.findById).toHaveBeenCalledWith(categoryId);
  expect(mockCategoryRepository.update).not.toHaveBeenCalled();
});
```

**O que testa**:
- ✅ Rejeita quando categoria não existe
- ✅ Não executa update se falhar validação

**Cenário 3.3**: Erro - nome duplicado
```typescript
it('should throw ApplicationError when new name already exists for another category', async () => {
  // Arrange
  const categoryId = '123e4567-e89b-12d3-a456-426614174000';
  const newName = 'Another Category';
  const existingCategory = new Category({
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: newName,
  });

  mockCategoryRepository.findById.mockReturnValue(mockCategory);
  mockCategoryRepository.findByName.mockReturnValue(existingCategory);

  // Act & Assert
  await expect(categoryService.update(categoryId, newName)).rejects.toThrow(
    new ApplicationError('Já existe uma categoria com este nome'),
  );

  expect(mockCategoryRepository.update).not.toHaveBeenCalled();
});
```

**O que testa**:
- ✅ Detecta nome duplicado de outra categoria
- ✅ Previne atualização em caso de duplicata

**Cenário 3.4**: Permitir mesmo nome (mesmo ID)
```typescript
it('should allow updating with same name (same ID)', async () => {
  // Arrange
  const categoryId = '123e4567-e89b-12d3-a456-426614174000';
  const sameName = 'Test Category';
  const sameCategory = new Category({ id: categoryId, name: sameName });

  mockCategoryRepository.findById.mockReturnValue(mockCategory);
  mockCategoryRepository.findByName.mockReturnValue(sameCategory);
  mockCategoryRepository.update.mockReturnValue(sameCategory);

  // Act
  const result = await categoryService.update(categoryId, sameName);

  // Assert
  expect(result).toEqual(sameCategory);
  expect(mockCategoryRepository.update).toHaveBeenCalledWith(categoryId, sameName);
});
```

**O que testa**:
- ✅ Permite atualizar com o mesmo nome (não é duplicata se for o mesmo ID)
- ✅ Validação de lógica de negócio correta

---

#### Teste 4: `delete` - Deletar Categoria

**Cenário 4.1**: Deletar com sucesso
```typescript
it('should delete category when it exists', async () => {
  // Arrange
  const categoryId = '123e4567-e89b-12d3-a456-426614174000';
  mockCategoryRepository.findById.mockReturnValue(mockCategory);

  // Act
  await categoryService.delete(categoryId);

  // Assert
  expect(mockCategoryRepository.findById).toHaveBeenCalledWith(categoryId);
  expect(mockCategoryRepository.delete).toHaveBeenCalledWith(categoryId);
});
```

**O que testa**:
- ✅ Verifica existência antes de deletar
- ✅ Chama delete com ID correto
- ✅ Não lança erro em sucesso

**Cenário 4.2**: Erro - categoria não encontrada
```typescript
it('should throw ApplicationError when category does not exist', async () => {
  // Arrange
  const categoryId = 'non-existent-id';
  mockCategoryRepository.findById.mockReturnValue(null);

  // Act & Assert
  await expect(categoryService.delete(categoryId)).rejects.toThrow(
    new ApplicationError('Categoria não encontrada'),
  );

  expect(mockCategoryRepository.delete).not.toHaveBeenCalled();
});
```

**O que testa**:
- ✅ Rejeita exclusão de categoria inexistente
- ✅ Não executa delete se falhar validação

---

#### Teste 5: `ApplicationError`

**Teste**: Classe de erro customizada
```typescript
it('should be an instance of Error', () => {
  // Arrange
  const error = new ApplicationError('Test error message');

  // Assert
  expect(error).toBeInstanceOf(Error);
  expect(error.name).toBe('ApplicationError');
  expect(error.message).toBe('Test error message');
});
```

**O que testa**:
- ✅ ApplicationError estende Error corretamente
- ✅ Nome e mensagem são preservados
- ✅ Pode ser capturado com `catch`

---

### 2. AuthService Tests

**Arquivo**: `tests/unit/services/authService.test.ts`

**Status**: ✅ Já existente no projeto

Testa:
- ✅ Login com credenciais válidas
- ✅ Rejeita email não encontrado
- ✅ Rejeita senha incorreta
- ✅ Registro de alunos e instrutores
- ✅ Validação de tokens JWT

---

## 🚀 Como Executar

### Executar Todos os Testes

```bash
npm test
```

Saída esperada:
```
 PASS  tests/unit/services/categoryService.test.ts
  CategoryService
    create
      ✓ should create a new category when name does not exist
      ✓ should throw ApplicationError when category name already exists
    list
      ✓ should return all categories
      ✓ should return empty array when no categories exist
    update
      ✓ should update category when it exists and new name is unique
      ✓ should throw ApplicationError when category does not exist
      ✓ should throw ApplicationError when new name already exists for another category
      ✓ should allow updating with same name (same ID)
    delete
      ✓ should delete category when it exists
      ✓ should throw ApplicationError when category does not exist
    ApplicationError
      ✓ should be an instance of Error

 PASS  tests/unit/services/authService.test.ts
  AuthService
    login
      ✓ should return user data and token when credentials are valid
      ✓ should throw ApplicationError when user is not found
      ✓ should throw ApplicationError when password does not match
    ...
```

### Executar Testes Específicos

```bash
# Testes de um arquivo específico
npm test -- tests/unit/services/categoryService.test.ts

# Testes com padrão de nome
npm test -- --testNamePattern="create"

# Apenas um bloco describe
npm test -- --testNamePattern="CategoryService"
```

### Modo Watch (Reexecuta ao salvar)

```bash
npm run test:watch
```

Útil durante desenvolvimento para feedback rápido.

### Cobertura de Testes

```bash
npm run test:coverage
```

Gera relatório de cobertura em `coverage/`:
- `lcov.info`: Formato padrão
- `coverage/index.html`: Relatório visual em HTML

---

## 📚 Boas Práticas

### 1. Testes Devem Ser Independentes

Cada teste não deve depender de outro:

```typescript
// ❌ Ruim - depende da ordem
let category;

it('create category', () => {
  category = categoryService.create('Test');
});

it('update category', () => {
  categoryService.update(category.id, 'New Name');
});

// ✅ Bom - cada teste é isolado
it('create category', () => {
  const category = categoryService.create('Test');
  expect(category.name).toBe('Test');
});

it('update category', () => {
  const category = { id: '123', name: 'Test' };
  const updated = categoryService.update(category.id, 'New Name');
  expect(updated.name).toBe('New Name');
});
```

### 2. Limpar Mocks Entre Testes

Use `beforeEach` para resetar estado:

```typescript
beforeEach(() => {
  mockRepository = createMock();
  jest.clearAllMocks();  // Limpa histórico de chamadas
});
```

### 3. Nomes Descritivos

Testes devem descrever o comportamento esperado:

```typescript
// ❌ Ruim
it('works', () => { ... });

// ✅ Bom
it('should throw ApplicationError when category name already exists', () => { ... });
```

### 4. One Assert Per Test (Quando Possível)

```typescript
// ❌ Ruim - múltiplas asserções misturadas
it('should create category', () => {
  expect(result.id).toBeDefined();
  expect(result.name).toBe('Test');
  expect(mockRepository.save).toHaveBeenCalled();
  expect(mockRepository.findByName).toHaveBeenCalled();
});

// ✅ Bom - testes focados
it('should return category with id', () => {
  expect(result).toHaveProperty('id');
});

it('should return category with correct name', () => {
  expect(result.name).toBe('Test');
});

it('should call repository save', () => {
  expect(mockRepository.save).toHaveBeenCalled();
});
```

### 5. Use Fixtures (Dados Reutilizáveis)

```typescript
// ✅ Bom - dados centralizados
const mockCategory = new Category({
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Test Category',
});

describe('CategoryService', () => {
  it('should return mock category', () => {
    expect(mockCategory.name).toBe('Test Category');
  });
});
```

---

## 🎯 Padrão AAA

Todos os testes seguem o padrão **AAA (Arrange-Act-Assert)**:

```typescript
it('should do something', () => {
  // Arrange: Preparar dados e mocks
  const input = 'Test';
  mockRepository.findByName.mockReturnValue(null);

  // Act: Executar a ação
  const result = await service.create(input);

  // Assert: Verificar resultados
  expect(result.name).toBe('Test');
  expect(mockRepository.save).toHaveBeenCalled();
});
```

### Benefícios

✅ **Clareza**: Fácil entender o que o teste faz  
✅ **Manutenção**: Estrutura consistente  
✅ **Debug**: Saber exatamente onde falhou  

---

## 🔧 Mocks e Fixtures

### Criar Mocks

```typescript
// mockRepositories.ts
export const createMockCategoryRepository = () => ({
  save: jest.fn(),
  findByName: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
```

### Usar Mocks em Testes

```typescript
beforeEach(() => {
  mockRepository = createMockCategoryRepository();
  service = new CategoryService(mockRepository);
});

it('calls save when creating', () => {
  mockRepository.save.mockReturnValue({ id: '123', name: 'Test' });
  
  service.create('Test');
  
  expect(mockRepository.save).toHaveBeenCalled();
});
```

### Verificar Chamadas a Mocks

```typescript
// Verificar se foi chamado
expect(mockRepository.save).toHaveBeenCalled();

// Verificar quantas vezes foi chamado
expect(mockRepository.save).toHaveBeenCalledTimes(1);

// Verificar com quais argumentos foi chamado
expect(mockRepository.save).toHaveBeenCalledWith(mockCategory);

// Verificar se NÃO foi chamado
expect(mockRepository.save).not.toHaveBeenCalled();
```

---

## 📊 Cobertura Esperada

### CategoryService

| Método | Cobertura | Casos |
|--------|-----------|-------|
| `create` | 100% | 2 (sucesso, duplicata) |
| `list` | 100% | 2 (com items, vazio) |
| `update` | 100% | 4 (sucesso, não encontrada, duplicata, mesmo nome) |
| `delete` | 100% | 2 (sucesso, não encontrada) |
| **Total** | **100%** | **10 testes** |

### AuthService

| Método | Cobertura | Casos |
|--------|-----------|-------|
| `login` | 100% | 3+ (credenciais válidas, email não encontrado, senha incorreta) |
| **Parcial** | **~80%** | **Expandindo...** |

---

## 🚀 Próximos Passos

### Testes a Implementar

- [ ] CourseService
- [ ] ModuleService
- [ ] ClassService
- [ ] EnrollmentService
- [ ] ReviewService
- [ ] CartService
- [ ] StudentService
- [ ] UserService

### Testes de Integração

- [ ] Controllers (request/response)
- [ ] Middlewares (auth, validation)
- [ ] Rotas (endpoint a endpoint)

### Testes E2E

- [ ] Fluxo completo de compra
- [ ] Autenticação e autorização
- [ ] Upload e download de arquivos

---

## 📞 Troubleshooting

### Erro: "Cannot find name 'describe'"

**Solução**: Verificar arquivo `jest.d.ts` está definindo tipos globais:

```typescript
declare global {
  function describe(name: string, fn: () => void): void;
  // ... outros tipos
}
```

### Erro: "Cannot find module"

**Solução**: Verificar paths no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Mock não está funcionando

**Solução**: Usar `mockReturnValue` ou `mockResolvedValue`:

```typescript
// Para funções síncronas
mockRepository.findById.mockReturnValue(mockCategory);

// Para funções async
mockRepository.findById.mockResolvedValue(mockCategory);

// Para funções que lançam erro
mockRepository.delete.mockImplementation(() => {
  throw new Error('Delete failed');
});
```

---

### CourseService

**Arquivo**: `tests/unit/services/courseService.test.ts`

**Descrição**: Testes unitários do serviço de cursos, responsável pela lógica de criar, listar, atualizar e gerenciar inscrições de alunos.

**Métodos Testados**: `create()`, `list()`, `listByCategory()`, `listByInstructor()`, `getById()`, `update()`, `delete()`, `getStudents()`

**Total de Testes**: 22 casos  
**Cobertura**: 100% dos métodos

#### Teste 1: `create` - Criar Curso

**Cenário 1.1**: Criar novo curso com sucesso
```typescript
it('should create a new course when data is valid', async () => {
  // Arrange
  const courseData = {
    title: 'Test Course',
    description: 'Test Description',
    categoryId,
    price: 99.99,
  };

  mockCategoryRepository.findById.mockReturnValue({
    id: categoryId,
    name: 'Test Category',
  });

  mockCourseRepository.save.mockReturnValue({
    id: courseId,
    ...courseData,
    instructorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Act
  const result = await courseService.create(courseData, instructorId);

  // Assert
  expect(mockCategoryRepository.findById).toHaveBeenCalledWith(categoryId);
  expect(mockCourseRepository.save).toHaveBeenCalled();
  expect(result.id).toBe(courseId);
});
```

**O que testa**:
- ✅ Validação de categoria existente (findById é chamado)
- ✅ Salvamento de novo curso (save é chamado)
- ✅ Retorno de curso criado com ID correto

**Cenário 1.2**: Erro ao informar categoria inexistente
```typescript
it('should throw error when category does not exist', async () => {
  const courseData = {
    title: 'Test Course',
    description: 'Test Description',
    categoryId: '999',
    price: 99.99,
  };

  mockCategoryRepository.findById.mockReturnValue(null);

  await expect(courseService.create(courseData, instructorId)).rejects.toThrow(
    ApplicationError
  );
});
```

**O que testa**:
- ✅ Rejeição quando categoria não existe
- ✅ ApplicationError é lançado corretamente

**Cenário 1.3**: Erro ao omitir categoria
```typescript
it('should throw error when category is not provided', async () => {
  const courseData = {
    title: 'Test Course',
    description: 'Test Description',
    price: 99.99,
  } as any;

  await expect(courseService.create(courseData, instructorId)).rejects.toThrow(
    ApplicationError
  );
});
```

#### Teste 2: `list` - Listar Cursos com Paginação

**Cenário 2.1**: Listar cursos com paginação
```typescript
it('should list courses with pagination', async () => {
  const courses = [
    { id: courseId, title: 'Course 1', ... },
    { id: '...', title: 'Course 2', ... }
  ];

  mockCourseRepository.findAll.mockResolvedValue({
    courses,
    total: 2,
  });

  const result = await courseService.list(1, 10);

  expect(result.courses).toHaveLength(2);
  expect(result.total).toBe(2);
});
```

**O que testa**:
- ✅ Busca de cursos com página e limite
- ✅ Resposta com estrutura correta (courses + total)
- ✅ Quantidade correta de registros

**Cenário 2.2**: Filtro por termo de busca
```typescript
it('should filter courses by search term', async () => {
  mockCourseRepository.findAll.mockResolvedValue({
    courses: [],
    total: 0,
  });

  await courseService.list(1, 10, 'javascript');

  expect(mockCourseRepository.findAll).toHaveBeenCalledWith({ 
    page: 1, 
    limit: 10, 
    search: 'javascript' 
  });
});
```

**O que testa**:
- ✅ Passagem correta do parâmetro de busca
- ✅ Busca é opcional e funciona quando informada

**Cenário 2.3**: Listar cursos vazios
```typescript
it('should handle empty course list', async () => {
  mockCourseRepository.findAll.mockResolvedValue({
    courses: [],
    total: 0,
  });

  const result = await courseService.list(1, 10);

  expect(result.courses).toHaveLength(0);
  expect(result.total).toBe(0);
});
```

#### Teste 3: `listByCategory` - Listar Cursos por Categoria

**Cenário 3.1**: Listar cursos de categoria específica
```typescript
it('should list courses by category', async () => {
  const courses = [{
    id: courseId,
    title: 'JS Course',
    categoryId,
    ...
  }];

  mockCourseRepository.findByCategoryId.mockResolvedValue({
    courses,
    total: 1,
  });

  const result = await courseService.listByCategory(categoryId, 1, 10);

  expect(result.courses).toHaveLength(1);
  expect(result.courses[0].categoryId).toBe(categoryId);
});
```

**O que testa**:
- ✅ Filtragem por categoria ID
- ✅ Retorno apenas de cursos da categoria solicitada

**Cenário 3.2**: Categoria sem cursos
```typescript
it('should return empty list for category with no courses', async () => {
  mockCourseRepository.findByCategoryId.mockResolvedValue({
    courses: [],
    total: 0,
  });

  const result = await courseService.listByCategory(categoryId, 1, 10);

  expect(result.courses).toHaveLength(0);
});
```

#### Teste 4: `listByInstructor` - Listar Cursos do Instrutor

**Cenário 4.1**: Listar cursos de um instrutor
```typescript
it('should list courses by instructor', async () => {
  const courses = [{
    id: courseId,
    title: 'Course 1',
    instructorId,
    ...
  }];

  mockCourseRepository.findByInstructorId.mockResolvedValue(courses);

  const result = await courseService.listByInstructor(instructorId);

  expect(result).toHaveLength(1);
  expect(result[0].instructorId).toBe(instructorId);
});
```

**O que testa**:
- ✅ Filtragem de cursos por instrutor ID
- ✅ Retorno de array de cursos do instrutor

**Cenário 4.2**: Instrutor sem cursos
```typescript
it('should return empty array when instructor has no courses', async () => {
  mockCourseRepository.findByInstructorId.mockResolvedValue([]);

  const result = await courseService.listByInstructor(instructorId);

  expect(result).toHaveLength(0);
});
```

#### Teste 5: `getById` - Buscar Curso por ID

**Cenário 5.1**: Buscar curso existente
```typescript
it('should get course by ID', async () => {
  const course = {
    id: courseId,
    title: 'Test Course',
    instructorId,
    categoryId,
    price: 99.99
  };

  mockCourseRepository.findById.mockReturnValue(course);

  const result = await courseService.getById(courseId);

  expect(result).toEqual(course);
});
```

**O que testa**:
- ✅ Busca de curso por ID
- ✅ Retorno do curso correto

**Cenário 5.2**: Curso não encontrado
```typescript
it('should throw ApplicationError when course not found', async () => {
  mockCourseRepository.findById.mockReturnValue(null);

  await expect(courseService.getById(courseId)).rejects.toThrow(
    ApplicationError
  );
});
```

**O que testa**:
- ✅ Erro quando curso não existe

#### Teste 6: `update` - Atualizar Curso

**Cenário 6.1**: Atualizar curso (instrutor proprietário)
```typescript
it('should update course when instructor owns it', async () => {
  const existingCourse = {
    id: courseId,
    title: 'Old Title',
    instructorId,
    categoryId,
    price: 99.99,
  };

  mockCourseRepository.findById.mockReturnValue(existingCourse);
  mockCourseRepository.update.mockReturnValue({
    ...existingCourse,
    title: 'New Title',
    price: 149.99,
  });

  const result = await courseService.update(
    courseId,
    { title: 'New Title', price: 149.99 },
    instructorId
  );

  expect(result.title).toBe('New Title');
});
```

**O que testa**:
- ✅ Verificação de propriedade (apenas o instrutor pode editar)
- ✅ Atualização bem-sucedida de dados do curso
- ✅ Retorno de curso atualizado

**Cenário 6.2**: Erro ao atualizar curso de outro instrutor
```typescript
it('should throw error when instructor does not own course', async () => {
  const existingCourse = {
    id: courseId,
    instructorId: 'different-instructor-id',
    categoryId,
    ...
  };

  mockCourseRepository.findById.mockReturnValue(existingCourse);

  await expect(
    courseService.update(courseId, { title: 'New' }, instructorId)
  ).rejects.toThrow(ApplicationError);
});
```

**O que testa**:
- ✅ Proteção contra edição não autorizada
- ✅ ApplicationError lançado quando instrutor não é proprietário

**Cenário 6.3**: Curso não encontrado
```typescript
it('should throw error when course not found', async () => {
  mockCourseRepository.findById.mockReturnValue(null);

  await expect(
    courseService.update(courseId, { title: 'New' }, instructorId)
  ).rejects.toThrow(ApplicationError);
});
```

#### Teste 7: `delete` - Soft Delete de Curso

**Cenário 7.1**: Deletar curso (instrutor proprietário)
```typescript
it('should soft delete course when instructor owns it', async () => {
  const course = {
    id: courseId,
    title: 'Test Course',
    instructorId,
    categoryId,
    price: 99.99,
  };

  mockCourseRepository.findById.mockReturnValue(course);
  mockCourseRepository.softDelete.mockReturnValue(undefined);

  await courseService.delete(courseId, instructorId);

  expect(mockCourseRepository.softDelete).toHaveBeenCalledWith(courseId);
});
```

**O que testa**:
- ✅ Verificação de propriedade
- ✅ Chamada de soft delete no repositório
- ✅ Sem erro quando propriedade é válida

**Cenário 7.2**: Erro ao deletar curso de outro instrutor
```typescript
it('should throw error when instructor does not own course', async () => {
  const course = {
    id: courseId,
    instructorId: 'different-instructor-id',
    ...
  };

  mockCourseRepository.findById.mockReturnValue(course);

  await expect(
    courseService.delete(courseId, instructorId)
  ).rejects.toThrow(ApplicationError);
});
```

**O que testa**:
- ✅ Proteção contra deleção não autorizada

**Cenário 7.3**: Curso não encontrado
```typescript
it('should throw error when course not found', async () => {
  mockCourseRepository.findById.mockReturnValue(null);

  await expect(
    courseService.delete(courseId, instructorId)
  ).rejects.toThrow(ApplicationError);
});
```

#### Teste 8: `getStudents` - Listar Alunos do Curso

**Cenário 8.1**: Listar alunos (instrutor proprietário)
```typescript
it('should get course students when instructor owns it', async () => {
  const course = {
    id: courseId,
    title: 'Test Course',
    instructorId,
    categoryId,
    price: 99.99,
  };

  const students = [{
    id: 'student-id',
    name: 'Student 1',
    email: 'student1@test.com',
  }];

  mockCourseRepository.findById.mockReturnValue(course);
  mockCourseRepository.findStudents.mockReturnValue(students);

  const result = await courseService.getStudents(courseId, instructorId);

  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Student 1');
});
```

**O que testa**:
- ✅ Verificação de propriedade
- ✅ Retorno de lista de alunos inscritos
- ✅ Acesso controlado (apenas instrutor proprietário)

**Cenário 8.2**: Curso sem alunos
```typescript
it('should return empty array when course has no students', async () => {
  const course = {
    id: courseId,
    title: 'Test Course',
    instructorId,
    categoryId,
    price: 99.99,
  };

  mockCourseRepository.findById.mockReturnValue(course);
  mockCourseRepository.findStudents.mockReturnValue([]);

  const result = await courseService.getStudents(courseId, instructorId);

  expect(result).toHaveLength(0);
});
```

**O que testa**:
- ✅ Retorno vazio quando não há inscritos

**Cenário 8.3**: Erro ao acessar alunos de outro instrutor
```typescript
it('should throw error when instructor does not own course', async () => {
  const course = {
    id: courseId,
    instructorId: 'different-instructor-id',
    ...
  };

  mockCourseRepository.findById.mockReturnValue(course);

  await expect(
    courseService.getStudents(courseId, instructorId)
  ).rejects.toThrow(ApplicationError);
});
```

**O que testa**:
- ✅ Proteção contra acesso não autorizado
- ✅ ApplicationError quando instrutor não é proprietário

**Cenário 8.4**: Curso não encontrado
```typescript
it('should throw error when course not found', async () => {
  mockCourseRepository.findById.mockReturnValue(null);

  await expect(
    courseService.getStudents(courseId, instructorId)
  ).rejects.toThrow(ApplicationError);
});
```

---

## 📄 Referências

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [TypeScript Jest Configuration](https://kulshekhar.github.io/ts-jest/)
- [AAA Pattern](https://wiki.c2.com/?ArrangeActAssert)

---

**Última Atualização**: 27 de Janeiro de 2026  
**Autor**: Equipe de Desenvolvimento  
**Status**: ✅ Documentação Ativa

---

## 📌 Sumário Consolidado e Checklist de Revisão

Este documento centraliza o sumário executivo e o checklist de revisão para evitar duplicação entre arquivos auxiliares.

Resumo rápido:

- Testes implementados: `CategoryService` (11 casos), `CourseService` (22 casos), `AuthService` (existente)
- Cobertura `CategoryService`: 100% ✅
- Cobertura `CourseService`: 100% ✅
- Mocks centralizados: `tests/mocks/mockRepositories.ts`
- Setup global: `tests/setup/testSetup.ts`
- Tipos globais: `tests/jest.d.ts`

Checklist (verificação mínima antes de aprovar PRs de testes):

- [x] Arquivos de teste colocados em `tests/unit/services/`
  - [x] `categoryService.test.ts` (11 testes, 100% cobertura)
  - [x] `courseService.test.ts` (22 testes, 100% cobertura)

- [x] Mocks reutilizáveis criados/atualizados em `tests/mocks/`
- [x] `tests/setup/testSetup.ts` documentado e funciona
- [x] Sem erros TypeScript nos arquivos de teste
- [x] Testes executam localmente com `npm test`
- [x] Documentação principal e template atualizados

Observação: mantemos `TESTES_UNITARIOS.md` como fonte única para instruções e sumário. Arquivos como `SUMARIO_TESTES.md`, `CHECKLIST_REVISAO.md` e `INDICE_DOCUMENTACAO.md` foram simplificados para apontar para este documento.
