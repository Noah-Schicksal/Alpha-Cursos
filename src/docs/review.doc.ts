/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Gerenciamento de avaliações de cursos
 */

/**
 * @swagger
 * /courses/{id}/reviews:
 *   get:
 *     summary: Listar avaliações de um curso
 *     description: |
 *       Retorna todas as avaliações de um curso específico.
 *       Endpoint público para visualização das avaliações.
 *     tags: [Reviews]
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
 *         description: Avaliações retornadas com sucesso
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
 *                       rating:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 5
 *                         example: 5
 *                       comment:
 *                         type: string
 *                         example: "Excelente curso!"
 *                       studentId:
 *                         type: string
 *                         format: uuid
 *                       courseId:
 *                         type: string
 *                         format: uuid
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /courses/{id}/reviews:
 *   post:
 *     summary: Criar avaliação do curso
 *     description: |
 *       Permite que um estudante matriculado avalie um curso.
 *       Cada estudante pode criar apenas uma avaliação por curso.
 *     tags: [Reviews]
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
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *                 description: Nota de 1 a 5 estrelas
 *               comment:
 *                 type: string
 *                 example: "Excelente curso! Recomendo."
 *                 description: Comentário sobre o curso
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Avaliação criada com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     rating:
 *                       type: integer
 *                     comment:
 *                       type: string
 *                     courseId:
 *                       type: string
 *                       format: uuid
 *                     studentId:
 *                       type: string
 *                       format: uuid
 *       400:
 *         description: Dados inválidos ou estudante já avaliou este curso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não matriculado no curso ou não é estudante
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Excluir avaliação
 *     description: |
 *       Permite que o autor da avaliação exclua permanentemente sua própria avaliação.
 *       Apenas o autor pode deletar sua avaliação.
 *     tags: [Reviews]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da avaliação (UUID)
 *         example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *     responses:
 *       204:
 *         description: Avaliação excluída com sucesso (sem conteúdo na resposta)
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Sem permissão para excluir esta avaliação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Você não tem permissão para excluir esta avaliação"
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Avaliação não encontrada"
 *       500:
 *         description: Erro interno do servidor
 */
