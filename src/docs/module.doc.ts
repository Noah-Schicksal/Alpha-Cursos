/**
 * @swagger
 * tags:
 *   - name: Modules
 *     description: Gerenciamento de módulos e aulas de um curso
 */

/**
 * @swagger
 * /courses/{id}/modules:
 *   get:
 *     summary: Listar módulos de um curso
 *     description: |
 *       Retorna todos os módulos associados ao curso, ordenados pelo orderIndex.
 *       Endpoint público para visualização da estrutura do curso.
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do curso (UUID)
 *         example: "93425141-aa16-4096-93bb-ae3832b9d017"
 *     responses:
 *       200:
 *         description: Módulos retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "9cf788ad-f8b7-4c89-8b77-f3fb6b90e400"
 *                       title:
 *                         type: string
 *                         example: "Módulo 1: Intro"
 *                       courseId:
 *                         type: string
 *                         format: uuid
 *                         example: "93425141-aa16-4096-93bb-ae3832b9d017"
 *                       orderIndex:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-01-26T12:29:56.392Z"
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /courses/{id}/modules:
 *   post:
 *     summary: Criar módulo em um curso
 *     description: |
 *       Cria um novo módulo dentro de um curso específico.
 *       Apenas o instrutor dono do curso pode adicionar módulos.
 *     tags: [Modules]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do curso (UUID)
 *         example: "93425141-aa16-4096-93bb-ae3832b9d017"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - orderIndex
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Módulo 1: Intro"
 *                 description: Título do módulo
 *               orderIndex:
 *                 type: integer
 *                 example: 1
 *                 description: Índice de ordenação do módulo
 *           example:
 *             title: "Módulo 1: Intro"
 *             orderIndex: 1
 *     responses:
 *       201:
 *         description: Módulo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Módulo criado com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "9cf788ad-f8b7-4c89-8b77-f3fb6b90e400"
 *                     title:
 *                       type: string
 *                       example: "Módulo 1: Intro"
 *                     courseId:
 *                       type: string
 *                       format: uuid
 *                       example: "93425141-aa16-4096-93bb-ae3832b9d017"
 *                     orderIndex:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-26T12:29:56.392Z"
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário sem permissão (não é dono do curso)
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /modules/{id}:
 *   get:
 *     summary: Buscar módulo por ID
 *     description: Retorna os detalhes de um módulo específico, incluindo a lista de aulas associadas.
 *     tags:
 *       - Modules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único do módulo
 *     responses:
 *       200:
 *         description: Módulo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "uuid-do-modulo"
 *                 title:
 *                   type: string
 *                   example: "Fundamentos de JavaScript"
 *                 orderIndex:
 *                   type: integer
 *                   example: 1
 *                 classes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid-da-aula"
 *                       title:
 *                         type: string
 *                         example: "Introdução ao JavaScript"
 *                       videoUrl:
 *                         type: string
 *                         example: "https://youtube.com/video"
 *       404:
 *         description: Módulo não encontrado
 */

/**
 * @swagger
 * /modules/{id}:
 *   put:
 *     summary: Atualizar módulo
 *     description: Atualiza os dados de um módulo existente. Apenas instrutores autores do curso podem realizar esta ação.
 *     tags:
 *       - Modules
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único do módulo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Módulo Atualizado"
 *               orderIndex:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Módulo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 orderIndex:
 *                   type: integer
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não autorizado
 *       404:
 *         description: Módulo não encontrado
 */

/**
 * @swagger
 * /modules/{id}:
 *   delete:
 *     summary: Remover módulo
 *     description: Remove permanentemente um módulo e todas as aulas associadas. Ação restrita ao instrutor autor do curso.
 *     tags:
 *       - Modules
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único do módulo
 *     responses:
 *       204:
 *         description: Módulo removido com sucesso (sem conteúdo na resposta)
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não autorizado
 *       404:
 *         description: Módulo não encontrado
 */

/**
 * @swagger
 * /modules/{moduleId}/classes:
 *   post:
 *     summary: Criar aula em módulo
 *     description: Cria uma nova aula dentro de um módulo específico. Ação restrita a instrutores.
 *     tags:
 *       - Modules
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único do módulo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - videoUrl
 *               - orderIndex
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Variáveis e Tipos de Dados"
 *               description:
 *                 type: string
 *                 example: "Conceitos de var, let e const"
 *               videoUrl:
 *                 type: string
 *                 example: "https://youtube.com/video"
 *               orderIndex:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Aula criada com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Acesso restrito a instrutores
 *       404:
 *         description: Módulo não encontrado
 */
