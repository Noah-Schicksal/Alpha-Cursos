import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Gerenciamento de Cursos Online',
      version: '1.0.0',
      description:
        'Documentação da API para o sistema de gerenciamento de cursos online.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
  },
  apis: ['./src/docs/*.doc.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
