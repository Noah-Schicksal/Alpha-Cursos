import request from 'supertest';
import { app } from '../server';

describe('User Routes', () => {
    // Unique emails for each run to avoid collision if DB isn't reset
    const timestamp = Date.now();
    const studentEmail = `student_test_${timestamp}@example.com`;
    const instructorEmail = `instructor_test_${timestamp}@example.com`;
    const password = 'Password123!'; // Strong password to pass validation

    describe('POST /auth/register/student', () => {
        it('should register a new student', async () => {
            const res = await request(app)
                .post('/auth/register/student')
                .send({
                    name: 'Test Student',
                    email: studentEmail,
                    password: password,
                    role: 'student'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('email', studentEmail);
            expect(res.body).toHaveProperty('role', 'STUDENT');
        });

        it('should fail with weak password', async () => {
            const res = await request(app)
                .post('/auth/register/student')
                .send({
                    name: 'Weak Password Student',
                    email: `weak_${timestamp}@example.com`,
                    password: '123',
                    role: 'student'
                });

            expect(res.statusCode).toBeGreaterThanOrEqual(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /auth/register/instructor', () => {
        it('should register a new instructor', async () => {
            const res = await request(app)
                .post('/auth/register/instructor')
                .send({
                    name: 'Test Instructor',
                    email: instructorEmail,
                    password: password,
                    role: 'instructor'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('email', instructorEmail);
            expect(res.body).toHaveProperty('role', 'INSTRUCTOR');
        });
    });

    describe('POST /auth/login', () => {
        it('should login successfully with valid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: studentEmail,
                    password: password
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should fail login with invalid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: studentEmail,
                    password: 'WrongPassword123!'
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('error');
        });
    });
});
