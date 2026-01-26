# Log de Teste Completo da API

Data: 26/01/2026, 08:27:39


## Inicialização

ℹ️ **[INFO]** Iniciando Servidor de Teste na porta 3001...
✅ **[SUCESSO]** Servidor iniciado com sucesso.

## 1. Autenticação

> **Requisição**: `POST /auth/register/student`
> Corpo: ```json
{
  "name": "Estudante 1769426862612",
  "email": "student_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "069ac4ed-6e86-4212-ad10-30661c6ebf54",
    "name": "Estudante 1769426862612",
    "email": "student_1769426862612@test.com",
    "role": "STUDENT",
    "createdAt": "2026-01-26T11:27:42.682Z"
  },
  "message": "Estudante registrado com sucesso"
}
```

✅ **[SUCESSO]** Registro de Estudante
> **Requisição**: `POST /auth/register/instructor`
> Corpo: ```json
{
  "name": "Instrutor 1769426862612",
  "email": "instructor_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "14ef0d54-880e-4016-a5a9-026e2afc84b8",
    "name": "Instrutor 1769426862612",
    "email": "instructor_1769426862612@test.com",
    "role": "INSTRUCTOR",
    "createdAt": "2026-01-26T11:27:42.739Z"
  },
  "message": "Instrutor registrado com sucesso"
}
```

✅ **[SUCESSO]** Registro de Instrutor
> **Requisição**: `POST /auth/login`
> Corpo: ```json
{
  "email": "student_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "user": {
      "id": "069ac4ed-6e86-4212-ad10-30661c6ebf54",
      "name": "Estudante 1769426862612",
      "email": "student_1769426862612@test.com",
      "role": "STUDENT"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXN0dWRhbnRlIDE3Njk0MjY4NjI2MTIiLCJpZCI6IjA2OWFjNGVkLTZlODYtNDIxMi1hZDEwLTMwNjYxYzZlYmY1NCIsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzY5NDI2ODYyLCJleHAiOjE3Njk0MzA0NjJ9.68T6xAnk3E0IuUUMh-1Jy38_aNAKh4E-VMMSJGZPQW4"
  },
  "message": "Login realizado com sucesso"
}
```

✅ **[SUCESSO]** Login Estudante
> **Requisição**: `POST /auth/login`
> Corpo: ```json
{
  "email": "instructor_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "user": {
      "id": "14ef0d54-880e-4016-a5a9-026e2afc84b8",
      "name": "Instrutor 1769426862612",
      "email": "instructor_1769426862612@test.com",
      "role": "INSTRUCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5zdHJ1dG9yIDE3Njk0MjY4NjI2MTIiLCJpZCI6IjE0ZWYwZDU0LTg4MGUtNDAxNi1hNWE5LTAyNmUyYWZjODRiOCIsInJvbGUiOiJJTlNUUlVDVE9SIiwiaWF0IjoxNzY5NDI2ODYyLCJleHAiOjE3Njk0MzA0NjJ9.emzrI3H31qemMCMqTyZ54fjExxyfREagHvr9i9wOIpw"
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
    },
    {
      "id": "8e009147-72b8-4062-85b3-5efb23a3d047",
      "name": "Cover Test Cat"
    }
  ]
}
```

✅ **[SUCESSO]** Listar Categorias
ℹ️ **[INFO]** Usando ID de categoria existente: ede3e696-536a-4272-aac0-4cbfd98442b6

## 3. Gerenciamento de Cursos (Instrutor)

> **Requisição**: `POST /courses`
> Corpo: ```json
"[Dados Multipart]"
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
    "title": "Curso 1769426862612",
    "description": "Descrição do curso de teste",
    "price": 99.99,
    "coverImageUrl": "/storage/courses/curso_1769426862612/452f6d90-6274-4ca3-b842-6573ccfe5690.jpg",
    "instructorId": "14ef0d54-880e-4016-a5a9-026e2afc84b8",
    "categoryId": "ede3e696-536a-4272-aac0-4cbfd98442b6",
    "isActive": true,
    "createdAt": "2026-01-26T11:27:42.873Z"
  },
  "message": "Curso criado com sucesso"
}
```

✅ **[SUCESSO]** Criar Curso com Imagem
✅ **[SUCESSO]**   coverImageUrl presente na resposta
ℹ️ **[INFO]**   URL: /storage/courses/curso_1769426862612/452f6d90-6274-4ca3-b842-6573ccfe5690.jpg
✅ **[SUCESSO]**   Acesso público GET /courses/:id/cover
✅ **[SUCESSO]**   Conteúdo da imagem verificado
> **Requisição**: `POST /courses/cd909b14-dcbc-4d18-8766-0993a3842e7f/modules`
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
    "id": "4614b240-8682-4b9f-8131-f43ae804a5c9",
    "title": "Módulo 1: Intro",
    "courseId": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
    "orderIndex": 1,
    "createdAt": "2026-01-26T11:27:42.898Z"
  },
  "message": "Módulo criado com sucesso"
}
```

✅ **[SUCESSO]** Criar Módulo
> **Requisição**: `POST /modules/4614b240-8682-4b9f-8131-f43ae804a5c9/classes`
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
    "id": "c069e695-929c-4022-bab9-dc87e90ca936",
    "title": "Aula 1: Olá Mundo",
    "description": "Primeira aula",
    "videoUrl": "https://youtube.com/watch?v=123",
    "moduleId": "4614b240-8682-4b9f-8131-f43ae804a5c9",
    "createdAt": "2026-01-26T11:27:42.902Z"
  },
  "message": "Aula criada com sucesso"
}
```

✅ **[SUCESSO]** Criar Aula
> **Requisição**: `GET /courses/authored`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": [
    {
      "id": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
      "title": "Curso 1769426862612",
      "description": "Descrição do curso de teste",
      "price": 99.99,
      "coverImageUrl": "/storage/courses/curso_1769426862612/452f6d90-6274-4ca3-b842-6573ccfe5690.jpg",
      "isActive": true,
      "enrolledCount": 0,
      "category": {
        "name": "Cat 1769408330507"
      }
    }
  ]
}
```

✅ **[SUCESSO]** Listar Cursos do Instrutor (Authored)
✅ **[SUCESSO]**   Curso criado encontrado na lista
> **Requisição**: `POST /auth/register/instructor`
> Corpo: ```json
{
  "name": "Other Instr 1769426862612",
  "email": "other_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "9db0ebd1-96cd-491d-aac2-8bdb75e87b5b",
    "name": "Other Instr 1769426862612",
    "email": "other_1769426862612@test.com",
    "role": "INSTRUCTOR",
    "createdAt": "2026-01-26T11:27:42.964Z"
  },
  "message": "Instrutor registrado com sucesso"
}
```

> **Requisição**: `POST /auth/login`
> Corpo: ```json
{
  "email": "other_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "user": {
      "id": "9db0ebd1-96cd-491d-aac2-8bdb75e87b5b",
      "name": "Other Instr 1769426862612",
      "email": "other_1769426862612@test.com",
      "role": "INSTRUCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiT3RoZXIgSW5zdHIgMTc2OTQyNjg2MjYxMiIsImlkIjoiOWRiMGViZDEtOTZjZC00OTFkLWFhYzItOGJkYjc1ZTg3YjViIiwicm9sZSI6IklOU1RSVUNUT1IiLCJpYXQiOjE3Njk0MjY4NjMsImV4cCI6MTc2OTQzMDQ2M30.JMoA3iIqmmQZrslptuGGWImg0kgnidkqdsJh_NR_EKs"
  },
  "message": "Login realizado com sucesso"
}
```

> **Requisição**: `GET /courses/authored`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": []
}
```

✅ **[SUCESSO]**   Outro instrutor NÃO vê meu curso (Isolamento)

## 4. Storage & Materiais

> **Requisição**: `POST /auth/register/instructor`
> Corpo: ```json
{
  "name": "Malicious 1769426862612",
  "email": "hacker_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "543c3e44-daf6-45fd-b9cb-fa2d61dcd393",
    "name": "Malicious 1769426862612",
    "email": "hacker_1769426862612@test.com",
    "role": "INSTRUCTOR",
    "createdAt": "2026-01-26T11:27:43.079Z"
  },
  "message": "Instrutor registrado com sucesso"
}
```

> **Requisição**: `POST /auth/login`
> Corpo: ```json
{
  "email": "hacker_1769426862612@test.com",
  "password": "Password123!"
}
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "user": {
      "id": "543c3e44-daf6-45fd-b9cb-fa2d61dcd393",
      "name": "Malicious 1769426862612",
      "email": "hacker_1769426862612@test.com",
      "role": "INSTRUCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFsaWNpb3VzIDE3Njk0MjY4NjI2MTIiLCJpZCI6IjU0M2MzZTQ0LWRhZjYtNDVmZC1iOWNiLWZhMmQ2MWRjZDM5MyIsInJvbGUiOiJJTlNUUlVDVE9SIiwiaWF0IjoxNzY5NDI2ODYzLCJleHAiOjE3Njk0MzA0NjN9._RFyzSVwV1jH_ndvXtbhj8Xi6sQ8bwPTCsLQWuZlPGc"
  },
  "message": "Login realizado com sucesso"
}
```

> **Requisição**: `POST /classes/c069e695-929c-4022-bab9-dc87e90ca936/upload`
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
> **Requisição**: `POST /classes/c069e695-929c-4022-bab9-dc87e90ca936/upload`
> Corpo: ```json
"[Dados Multipart]"
```

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "materialUrl": "/storage/courses/curso_1769426862612/m_dulo_1__intro/1_aula_1__ol__mundo/materials/971a092f-bf86-42c6-b11a-32ecb8c74c11.txt"
  },
  "message": "Material enviado com sucesso"
}
```

✅ **[SUCESSO]** Upload de Material
ℹ️ **[INFO]** URL retornado: /storage/courses/curso_1769426862612/m_dulo_1__intro/1_aula_1__ol__mundo/materials/971a092f-bf86-42c6-b11a-32ecb8c74c11.txt
✅ **[SUCESSO]** Acesso Público Direto Bloqueado (Correto)
> **Requisição**: `GET /classes/c069e695-929c-4022-bab9-dc87e90ca936/material`

> **Resposta**: Status `200`
> Corpo: ```json
"Conteúdo de teste para upload."
```

✅ **[SUCESSO]** Download via Endpoint Protegido (Instrutor)
> **Requisição**: `GET /classes/c069e695-929c-4022-bab9-dc87e90ca936/material`

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
      "id": "56069046-d4cb-475c-a01d-cb4a29d1fcdb",
      "title": "Curso Storage Test",
      "description": "Testando estrutura de pastas",
      "price": 10,
      "coverImageUrl": null,
      "category": {
        "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
        "name": "Cat 1769408330507"
      },
      "instructor": {
        "name": "Instrutor Storage 1769413055428"
      }
    },
    {
      "id": "43e22fe0-c976-4eb3-a08f-17e66e2f5708",
      "title": "Curso 1769424888261",
      "description": "Descrição do curso de teste",
      "price": 99.99,
      "coverImageUrl": null,
      "category": {
        "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
        "name": "Cat 1769408330507"
      },
      "instructor": {
        "name": "Instrutor 1769424888261"
      }
    },
    {
      "id": "56099be0-9b5a-459f-aa08-c5d14a61fa81",
      "title": "Curso Com Capa",
      "description": "Curso de teste",
      "price": 50,
      "coverImageUrl": "/storage/courses/curso_com_capa/88f0ed2b-af3e-423d-8f2e-320eadf0b9fa.txt",
      "category": {
        "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
        "name": "Cat 1769408330507"
      },
      "instructor": {
        "name": "Instrutor Cover"
      }
    },
    {
      "id": "31c6fefe-5906-4b1d-a44b-9227066d6a43",
      "title": "Curso Com Capa",
      "description": "Curso de teste",
      "price": 50,
      "coverImageUrl": "/storage/courses/curso_com_capa/a9ae8ae1-d688-4c2f-ac48-3e7d7fa048fd.txt",
      "category": {
        "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
        "name": "Cat 1769408330507"
      },
      "instructor": {
        "name": "Instrutor Cover"
      }
    },
    {
      "id": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
      "title": "Curso 1769426862612",
      "description": "Descrição do curso de teste",
      "price": 99.99,
      "coverImageUrl": "/storage/courses/curso_1769426862612/452f6d90-6274-4ca3-b842-6573ccfe5690.jpg",
      "category": {
        "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
        "name": "Cat 1769408330507"
      },
      "instructor": {
        "name": "Instrutor 1769426862612"
      }
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 6,
    "itemsPerPage": 10
  }
}
```

✅ **[SUCESSO]** Listar Todos Cursos (Público)
> **Requisição**: `GET /courses/cd909b14-dcbc-4d18-8766-0993a3842e7f`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "id": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
    "title": "Curso 1769426862612",
    "description": "Descrição do curso de teste",
    "price": 99.99,
    "coverImageUrl": "/storage/courses/curso_1769426862612/452f6d90-6274-4ca3-b842-6573ccfe5690.jpg",
    "maxStudents": null,
    "enrolledCount": 0,
    "averageRating": 0,
    "createdAt": "2026-01-26T11:27:42.873Z",
    "category": {
      "id": "ede3e696-536a-4272-aac0-4cbfd98442b6",
      "name": "Cat 1769408330507"
    },
    "instructorId": "14ef0d54-880e-4016-a5a9-026e2afc84b8",
    "instructor": {
      "id": "14ef0d54-880e-4016-a5a9-026e2afc84b8",
      "name": "Instrutor 1769426862612",
      "email": "instructor_1769426862612@test.com"
    }
  }
}
```

✅ **[SUCESSO]** Obter Detalhes do Curso
> **Requisição**: `GET /courses/cd909b14-dcbc-4d18-8766-0993a3842e7f/modules`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": [
    {
      "id": "4614b240-8682-4b9f-8131-f43ae804a5c9",
      "title": "Módulo 1: Intro",
      "courseId": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
      "orderIndex": 1,
      "createdAt": "2026-01-26T11:27:42.898Z",
      "classes": [
        {
          "id": "c069e695-929c-4022-bab9-dc87e90ca936",
          "title": "Aula 1: Olá Mundo",
          "description": "Primeira aula",
          "videoUrl": "https://youtube.com/watch?v=123",
          "materialUrl": "/storage/courses/curso_1769426862612/m_dulo_1__intro/1_aula_1__ol__mundo/materials/971a092f-bf86-42c6-b11a-32ecb8c74c11.txt",
          "moduleId": "4614b240-8682-4b9f-8131-f43ae804a5c9",
          "createdAt": "2026-01-26T11:27:42.902Z"
        }
      ]
    }
  ]
}
```

✅ **[SUCESSO]** Listar Módulos do Curso
> **Requisição**: `GET /modules/4614b240-8682-4b9f-8131-f43ae804a5c9`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "id": "4614b240-8682-4b9f-8131-f43ae804a5c9",
    "title": "Módulo 1: Intro",
    "courseId": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
    "orderIndex": 1,
    "createdAt": "2026-01-26T11:27:42.898Z",
    "classes": [
      {
        "id": "c069e695-929c-4022-bab9-dc87e90ca936",
        "title": "Aula 1: Olá Mundo",
        "description": "Primeira aula",
        "videoUrl": "https://youtube.com/watch?v=123",
        "materialUrl": "/storage/courses/curso_1769426862612/m_dulo_1__intro/1_aula_1__ol__mundo/materials/971a092f-bf86-42c6-b11a-32ecb8c74c11.txt",
        "moduleId": "4614b240-8682-4b9f-8131-f43ae804a5c9",
        "createdAt": "2026-01-26T11:27:42.902Z"
      }
    ]
  }
}
```

✅ **[SUCESSO]** Obter Detalhes do Módulo (+ Aulas)
✅ **[SUCESSO]**   Classes retornadas no módulo
> **Requisição**: `GET /classes/c069e695-929c-4022-bab9-dc87e90ca936`

> **Resposta**: Status `200`
> Corpo: ```json
{
  "data": {
    "id": "c069e695-929c-4022-bab9-dc87e90ca936",
    "title": "Aula 1: Olá Mundo",
    "description": "Primeira aula",
    "videoUrl": "https://youtube.com/watch?v=123",
    "materialUrl": "/classes/c069e695-929c-4022-bab9-dc87e90ca936/material",
    "moduleId": "4614b240-8682-4b9f-8131-f43ae804a5c9",
    "createdAt": "2026-01-26T11:27:42.902Z"
  }
}
```

✅ **[SUCESSO]** Obter Detalhes da Aula (Video/Material)
> **Requisição**: `POST /cart`
> Corpo: ```json
{
  "courseId": "cd909b14-dcbc-4d18-8766-0993a3842e7f"
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "id": "fd11f54e-0e5b-4046-981d-6a262f0e9eb2",
    "userId": "069ac4ed-6e86-4212-ad10-30661c6ebf54",
    "courseId": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
    "addedAt": "2026-01-26T11:27:43.184Z"
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
    "orderDate": "2026-01-26T11:27:43.188Z",
    "items": [
      {
        "courseId": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
        "title": "Curso 1769426862612"
      }
    ]
  },
  "message": "Compra realizada com sucesso!"
}
```

✅ **[SUCESSO]** Realizar Checkout
> **Requisição**: `GET /classes/c069e695-929c-4022-bab9-dc87e90ca936/material`

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
      "id": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
      "title": "Curso 1769426862612",
      "description": "Descrição do curso de teste",
      "coverImageUrl": "/storage/courses/curso_1769426862612/452f6d90-6274-4ca3-b842-6573ccfe5690.jpg",
      "enrolledAt": "2026-01-26T11:27:43.188Z",
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
> **Requisição**: `POST /classes/c069e695-929c-4022-bab9-dc87e90ca936/progress`
> Corpo: ```json
{
  "completed": true
}
```

> **Resposta**: Status `201`
> Corpo: ```json
{
  "data": {
    "classId": "c069e695-929c-4022-bab9-dc87e90ca936",
    "userId": "069ac4ed-6e86-4212-ad10-30661c6ebf54",
    "completedAt": "2026-01-26T11:27:43.198Z"
  },
  "message": "Aula marcada como concluída"
}
```

✅ **[SUCESSO]** Marcar Aula Concluída
> **Requisição**: `POST /courses/cd909b14-dcbc-4d18-8766-0993a3842e7f/reviews`
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
    "id": "4535f023-e12c-4311-88b3-efb80ba12e92",
    "userId": "069ac4ed-6e86-4212-ad10-30661c6ebf54",
    "courseId": "cd909b14-dcbc-4d18-8766-0993a3842e7f",
    "rating": 5,
    "comment": "Excelente curso!",
    "createdAt": "2026-01-26T11:27:43.200Z"
  },
  "message": "Avaliação enviada com sucesso"
}
```

✅ **[SUCESSO]** Postar Avaliação

## 6. Limpeza (Instrutor)

> **Requisição**: `DELETE /courses/cd909b14-dcbc-4d18-8766-0993a3842e7f`

> **Resposta**: Status `204`

✅ **[SUCESSO]** Excluir Curso

## Finalização

