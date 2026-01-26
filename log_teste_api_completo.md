# Log de Teste Completo da API

Data: 26/01/2026, 04:17:02


## Inicialização

ℹ️ **[INFO]** Iniciando Servidor de Teste na porta 3001...
✅ **[SUCESSO]** Servidor iniciado com sucesso.

## 1. Autenticação

> **Requisição**: `POST /auth/register/student`
> Corpo: ```json
{
  "name": "Estudante 1769411822629",
  "email": "student_1769411822629@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "b7e0066c-69e0-4ffe-bc89-b3f8e1f93e5a",
    "name": "Estudante 1769411822629",
    "email": "student_1769411822629@test.com",
    "role": "STUDENT",
    "createdAt": "2026-01-26T07:17:02.682Z"
  },
  "message": "Estudante registrado com sucesso"
}
```

✅ **[SUCESSO]** Registro de Estudante
> **Requisição**: `POST /auth/register/instructor`
> Corpo: ```json
{
  "name": "Instrutor 1769411822629",
  "email": "instructor_1769411822629@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "4266a49a-d932-4f6a-96aa-9c314ec9b086",
    "name": "Instrutor 1769411822629",
    "email": "instructor_1769411822629@test.com",
    "role": "INSTRUCTOR",
    "createdAt": "2026-01-26T07:17:02.734Z"
  },
  "message": "Instrutor registrado com sucesso"
}
```

✅ **[SUCESSO]** Registro de Instrutor
> **Requisição**: `POST /auth/login`
> Corpo: ```json
{
  "email": "student_1769411822629@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "user": {
      "id": "b7e0066c-69e0-4ffe-bc89-b3f8e1f93e5a",
      "name": "Estudante 1769411822629",
      "email": "student_1769411822629@test.com",
      "role": "STUDENT"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXN0dWRhbnRlIDE3Njk0MTE4MjI2MjkiLCJpZCI6ImI3ZTAwNjZjLTY5ZTAtNGZmZS1iYzg5LWIzZjhlMWY5M2U1YSIsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzY5NDExODIyLCJleHAiOjE3Njk0MTU0MjJ9.A2NqTylNVTuVhDijf1xPo36hisF5x7uyVH2L2hpH21g"
  },
  "message": "Login realizado com sucesso"
}
```

✅ **[SUCESSO]** Login Estudante
> **Requisição**: `POST /auth/login`
> Corpo: ```json
{
  "email": "instructor_1769411822629@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "user": {
      "id": "4266a49a-d932-4f6a-96aa-9c314ec9b086",
      "name": "Instrutor 1769411822629",
      "email": "instructor_1769411822629@test.com",
      "role": "INSTRUCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5zdHJ1dG9yIDE3Njk0MTE4MjI2MjkiLCJpZCI6IjQyNjZhNDlhLWQ5MzItNGY2YS05NmFhLTljMzE0ZWM5YjA4NiIsInJvbGUiOiJJTlNUUlVDVE9SIiwiaWF0IjoxNzY5NDExODIyLCJleHAiOjE3Njk0MTU0MjJ9._fKeeg-vgEPlv4a81XPzhBP-8dbU0ibkfnYfieIscgE"
  },
  "message": "Login realizado com sucesso"
}
```

✅ **[SUCESSO]** Login Instrutor

## 2. Categorias (Instrutor/Admin)

> **Requisição**: `GET /categories`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": [
    {
      "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
      "name": "Cat 1769408330507"
    }
  ]
}
```

✅ **[SUCESSO]** Listar Categorias
ℹ️ **[INFO]** Usando ID de categoria existente: ede3e696-536a-4272-aac0-4cbfd98442b6

## 3. Gerenciamento de Cursos (Instrutor)

> **Requisição**: `POST /courses`
> Corpo: ```json
{
  "title": "Curso 1769411822629",
  "description": "Descrição do curso de teste",
  "price": 99.99,
  "categoryId": "ede3e696-536a-4272-aac0-4cbfd98442b6"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
    "title": "Curso 1769411822629",
    "description": "Descrição do curso de teste",
    "price": 99.99,
    "instructorId": "4266a49a-d932-4f6a-96aa-9c314ec9b086",
    "categoryId": "ede3e696-536a-4272-aac0-4cbfd98442b6",
    "isActive": true,
    "createdAt": "2026-01-26T07:17:02.850Z"
  },
  "message": "Curso criado com sucesso"
}
```

✅ **[SUCESSO]** Criar Curso
> **Requisição**: `POST /courses/fc6f4a73-d211-4ac8-a89e-e38f7c6b7861/modules`
> Corpo: ```json
{
  "title": "Módulo 1: Intro",
  "orderIndex": 1
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "dadff747-14cc-4698-b95e-9f7a31a894e1",
    "title": "Módulo 1: Intro",
    "courseId": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
    "orderIndex": 1,
    "createdAt": "2026-01-26T07:17:02.853Z"
  },
  "message": "Módulo criado com sucesso"
}
```

✅ **[SUCESSO]** Criar Módulo
> **Requisição**: `POST /modules/dadff747-14cc-4698-b95e-9f7a31a894e1/classes`
> Corpo: ```json
{
  "title": "Aula 1: Olá Mundo",
  "description": "Primeira aula",
  "videoUrl": "https://youtube.com/watch?v=123",
  "orderIndex": 1
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "146c0d5c-ee18-41a3-acb2-16861c634689",
    "title": "Aula 1: Olá Mundo",
    "description": "Primeira aula",
    "videoUrl": "https://youtube.com/watch?v=123",
    "moduleId": "dadff747-14cc-4698-b95e-9f7a31a894e1",
    "createdAt": "2026-01-26T07:17:02.856Z"
  },
  "message": "Aula criada com sucesso"
}
```

✅ **[SUCESSO]** Criar Aula

## 4. Storage & Materiais

> **Requisição**: `POST /auth/register/instructor`
> Corpo: ```json
{
  "name": "Malicious 1769411822629",
  "email": "hacker_1769411822629@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "f09e8103-b30a-44cd-b58a-a90e5f568cb7",
    "name": "Malicious 1769411822629",
    "email": "hacker_1769411822629@test.com",
    "role": "INSTRUCTOR",
    "createdAt": "2026-01-26T07:17:02.909Z"
  },
  "message": "Instrutor registrado com sucesso"
}
```

> **Requisição**: `POST /auth/login`
> Corpo: ```json
{
  "email": "hacker_1769411822629@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "user": {
      "id": "f09e8103-b30a-44cd-b58a-a90e5f568cb7",
      "name": "Malicious 1769411822629",
      "email": "hacker_1769411822629@test.com",
      "role": "INSTRUCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFsaWNpb3VzIDE3Njk0MTE4MjI2MjkiLCJpZCI6ImYwOWU4MTAzLWIzMGEtNDRjZC1iNThhLWE5MGU1ZjU2OGNiNyIsInJvbGUiOiJJTlNUUlVDVE9SIiwiaWF0IjoxNzY5NDExODIyLCJleHAiOjE3Njk0MTU0MjJ9.CHwb52tXR8PQd0U5hpXBuLsPfz9xOuJFhZEHfZXPOSc"
  },
  "message": "Login realizado com sucesso"
}
```

> **Requisição**: `POST /classes/146c0d5c-ee18-41a3-acb2-16861c634689/upload`
> Corpo: ```json
"[Dados Multipart]"
```

> **Resposta**: Status `400`
> Corpo: ```json
{
  "error": "Você não tem permissão para adicionar materiais a esta aula"
}
```

✅ **[SUCESSO]** Segurança: Bloqueio de Upload por Outro Instrutor
> **Requisição**: `POST /classes/146c0d5c-ee18-41a3-acb2-16861c634689/upload`
> Corpo: ```json
"[Dados Multipart]"
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "materialUrl": "/storage/courses/curso_1769411822629/m_dulo_1__intro/1_aula_1__ol__mundo/materials/14e0a0a1-8807-4b9a-9c81-edf298210d5c.txt"
  },
  "message": "Material enviado com sucesso"
}
```

✅ **[SUCESSO]** Upload de Material
ℹ️ **[INFO]** URL retornado: /storage/courses/curso_1769411822629/m_dulo_1__intro/1_aula_1__ol__mundo/materials/14e0a0a1-8807-4b9a-9c81-edf298210d5c.txt
✅ **[SUCESSO]** Acesso Público Direto Bloqueado (Correto)
> **Requisição**: `GET /classes/146c0d5c-ee18-41a3-acb2-16861c634689/material`

> **Resposta**: Status `200`
> Corpo: ```json
"Conteúdo de teste para upload."
```

✅ **[SUCESSO]** Download via Endpoint Protegido (Instrutor)
> **Requisição**: `GET /classes/146c0d5c-ee18-41a3-acb2-16861c634689/material`

> **Resposta**: Status `400`
> Corpo: ```json
{
  "error": "Você precisa estar matriculado no curso para acessar o material"
}
```

✅ **[SUCESSO]** Bloqueio Aluno Não Matriculado

## 5. Jornada do Estudante

> **Requisição**: `GET /courses`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": [
    {
      "id": "1652fd8d-72fd-4e8c-8d53-03fb267b2864",
      "title": "Course 1769408330507",
      "description": "A test course description",
      "price": 99.99,
      "coverImageUrl": null,
      "category": {
        "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
        "name": "Cat 1769408330507"
      },
      "instructor": {
        "name": "Instructor 1769408330507"
      }
    },
    {
      "id": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
      "title": "Curso 1769411822629",
      "description": "Descrição do curso de teste",
      "price": 99.99,
      "coverImageUrl": null,
      "category": {
        "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
        "name": "Cat 1769408330507"
      },
      "instructor": {
        "name": "Instrutor 1769411822629"
      }
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 2,
    "itemsPerPage": 10
  }
}
```

✅ **[SUCESSO]** Listar Todos Cursos (Público)
> **Requisição**: `GET /courses/fc6f4a73-d211-4ac8-a89e-e38f7c6b7861`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "id": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
    "title": "Curso 1769411822629",
    "description": "Descrição do curso de teste",
    "price": 99.99,
    "coverImageUrl": null,
    "maxStudents": null,
    "enrolledCount": 0,
    "averageRating": 0,
    "createdAt": "2026-01-26T07:17:02.850Z",
    "category": {
      "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
      "name": "Cat 1769408330507"
    },
    "instructorId": "4266a49a-d932-4f6a-96aa-9c314ec9b086",
    "instructor": {
      "id": "4266a49a-d932-4f6a-96aa-9c314ec9b086",
      "name": "Instrutor 1769411822629",
      "email": "instructor_1769411822629@test.com"
    }
  }
}
```

✅ **[SUCESSO]** Obter Detalhes do Curso
> **Requisição**: `GET /courses/fc6f4a73-d211-4ac8-a89e-e38f7c6b7861/modules`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": [
    {
      "id": "dadff747-14cc-4698-b95e-9f7a31a894e1",
      "title": "Módulo 1: Intro",
      "courseId": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
      "orderIndex": 1,
      "createdAt": "2026-01-26T07:17:02.853Z",
      "classes": [
        {
          "id": "146c0d5c-ee18-41a3-acb2-16861c634689",
          "title": "Aula 1: Olá Mundo",
          "description": "Primeira aula",
          "videoUrl": "https://youtube.com/watch?v=123",
          "materialUrl": "/storage/courses/curso_1769411822629/m_dulo_1__intro/1_aula_1__ol__mundo/materials/14e0a0a1-8807-4b9a-9c81-edf298210d5c.txt",
          "moduleId": "dadff747-14cc-4698-b95e-9f7a31a894e1",
          "createdAt": "2026-01-26T07:17:02.856Z"
        }
      ]
    }
  ]
}
```

✅ **[SUCESSO]** Listar Módulos do Curso
> **Requisição**: `GET /modules/dadff747-14cc-4698-b95e-9f7a31a894e1`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "id": "dadff747-14cc-4698-b95e-9f7a31a894e1",
    "title": "Módulo 1: Intro",
    "courseId": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
    "orderIndex": 1,
    "createdAt": "2026-01-26T07:17:02.853Z",
    "classes": [
      {
        "id": "146c0d5c-ee18-41a3-acb2-16861c634689",
        "title": "Aula 1: Olá Mundo",
        "description": "Primeira aula",
        "videoUrl": "https://youtube.com/watch?v=123",
        "materialUrl": "/storage/courses/curso_1769411822629/m_dulo_1__intro/1_aula_1__ol__mundo/materials/14e0a0a1-8807-4b9a-9c81-edf298210d5c.txt",
        "moduleId": "dadff747-14cc-4698-b95e-9f7a31a894e1",
        "createdAt": "2026-01-26T07:17:02.856Z"
      }
    ]
  }
}
```

✅ **[SUCESSO]** Obter Detalhes do Módulo (+ Aulas)
✅ **[SUCESSO]**   Classes retornadas no módulo
> **Requisição**: `GET /classes/146c0d5c-ee18-41a3-acb2-16861c634689`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "id": "146c0d5c-ee18-41a3-acb2-16861c634689",
    "title": "Aula 1: Olá Mundo",
    "description": "Primeira aula",
    "videoUrl": "https://youtube.com/watch?v=123",
    "materialUrl": "/classes/146c0d5c-ee18-41a3-acb2-16861c634689/material",
    "moduleId": "dadff747-14cc-4698-b95e-9f7a31a894e1",
    "createdAt": "2026-01-26T07:17:02.856Z"
  }
}
```

✅ **[SUCESSO]** Obter Detalhes da Aula (Video/Material)
> **Requisição**: `POST /cart`
> Corpo: ```json
{
  "courseId": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "b2246720-c0ca-43a3-82ec-2701fe77fb4c",
    "userId": "b7e0066c-69e0-4ffe-bc89-b3f8e1f93e5a",
    "courseId": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
    "addedAt": "2026-01-26T07:17:02.988Z"
  },
  "message": "Curso adicionado ao carrinho"
}
```

✅ **[SUCESSO]** Adicionar ao Carrinho
> **Requisição**: `POST /checkout`
> Corpo: ```json
{}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "enrolledCourses": 1,
    "orderDate": "2026-01-26T07:17:02.991Z",
    "items": [
      {
        "courseId": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
        "title": "Curso 1769411822629"
      }
    ]
  },
  "message": "Compra realizada com sucesso!"
}
```

✅ **[SUCESSO]** Realizar Checkout
> **Requisição**: `GET /classes/146c0d5c-ee18-41a3-acb2-16861c634689/material`

> **Resposta**: Status `200`
> Corpo: ```json
"Conteúdo de teste para upload."
```

✅ **[SUCESSO]** Download via Endpoint Protegido (Aluno Matriculado)
> **Requisição**: `GET /my-courses`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": [
    {
      "id": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
      "title": "Curso 1769411822629",
      "description": "Descrição do curso de teste",
      "coverImageUrl": null,
      "enrolledAt": "2026-01-26T07:17:02.990Z",
      "progress": 0,
      "totalClasses": 1,
      "completedClasses": 0,
      "certificateHash": null
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "itemsPerPage": 10
  },
  "message": "Cursos listados com sucesso"
}
```

✅ **[SUCESSO]** Obter Meus Cursos
> **Requisição**: `POST /classes/146c0d5c-ee18-41a3-acb2-16861c634689/progress`
> Corpo: ```json
{
  "completed": true
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "classId": "146c0d5c-ee18-41a3-acb2-16861c634689",
    "userId": "b7e0066c-69e0-4ffe-bc89-b3f8e1f93e5a",
    "completedAt": "2026-01-26T07:17:02.998Z"
  },
  "message": "Aula marcada como concluída"
}
```

✅ **[SUCESSO]** Marcar Aula Concluída
> **Requisição**: `POST /courses/fc6f4a73-d211-4ac8-a89e-e38f7c6b7861/reviews`
> Corpo: ```json
{
  "rating": 5,
  "comment": "Excelente curso!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "73f14153-bc2b-4dfd-b256-8f5425c67d03",
    "userId": "b7e0066c-69e0-4ffe-bc89-b3f8e1f93e5a",
    "courseId": "fc6f4a73-d211-4ac8-a89e-e38f7c6b7861",
    "rating": 5,
    "comment": "Excelente curso!",
    "createdAt": "2026-01-26T07:17:03.001Z"
  },
  "message": "Avaliação enviada com sucesso"
}
```

✅ **[SUCESSO]** Postar Avaliação

## 6. Limpeza (Instrutor)

> **Requisição**: `DELETE /courses/fc6f4a73-d211-4ac8-a89e-e38f7c6b7861`

> **Resposta**: Status `204`

✅ **[SUCESSO]** Excluir Curso

## Finalização

