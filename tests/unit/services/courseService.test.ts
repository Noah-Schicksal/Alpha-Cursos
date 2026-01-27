import { CourseService, ApplicationError } from '../../../src/services/courseService';
import { createMockCourseRepository, createMockCategoryRepository } from '../../mocks/mockRepositories';

describe('CourseService', () => {
  let courseService: CourseService;
  let mockCourseRepository: any;
  let mockCategoryRepository: any;

  const courseId = '123e4567-e89b-12d3-a456-426614174100';
  const instructorId = '123e4567-e89b-12d3-a456-426614174001';
  const categoryId = '123e4567-e89b-12d3-a456-426614174050';

  beforeEach(() => {
    mockCourseRepository = createMockCourseRepository();
    mockCategoryRepository = createMockCategoryRepository();
    courseService = new CourseService(mockCourseRepository, mockCategoryRepository);
  });

  describe('create', () => {
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

    it('should throw error when category does not exist', async () => {
      // Arrange
      const courseData = {
        title: 'Test Course',
        description: 'Test Description',
        categoryId: '999',
        price: 99.99,
      };

      mockCategoryRepository.findById.mockReturnValue(null);

      // Act & Assert
      await expect(courseService.create(courseData, instructorId)).rejects.toThrow(
        ApplicationError
      );
    });

    it('should throw error when category is not provided', async () => {
      // Arrange
      const courseData = {
        title: 'Test Course',
        description: 'Test Description',
        price: 99.99,
      } as any;

      // Act & Assert
      await expect(courseService.create(courseData, instructorId)).rejects.toThrow(
        ApplicationError
      );
    });
  });

  describe('list', () => {
    it('should list courses with pagination', async () => {
      // Arrange
      const courses = [
        {
          id: courseId,
          title: 'Course 1',
          description: 'Desc 1',
          instructorId,
          categoryId: '123e4567-e89b-12d3-a456-426614174050',
          price: 99.99,
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174101',
          title: 'Course 2',
          description: 'Desc 2',
          instructorId,
          categoryId: '123e4567-e89b-12d3-a456-426614174050',
          price: 149.99,
        },
      ];

      mockCourseRepository.findAll.mockResolvedValue({
        courses,
        total: 2,
      });

      // Act
      const result = await courseService.list(1, 10);

      // Assert
      expect(mockCourseRepository.findAll).toHaveBeenCalledWith({ page: 1, limit: 10, search: undefined });
      expect(result.courses).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('should filter courses by search term', async () => {
      // Arrange
      mockCourseRepository.findAll.mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      // Act
      await courseService.list(1, 10, 'javascript');

      // Assert
      expect(mockCourseRepository.findAll).toHaveBeenCalledWith({ page: 1, limit: 10, search: 'javascript' });
    });

    it('should handle empty course list', async () => {
      // Arrange
      mockCourseRepository.findAll.mockResolvedValue({
        courses: [],
        total: 0,
      });

      // Act
      const result = await courseService.list(1, 10);

      // Assert
      expect(result.courses).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe('listByCategory', () => {
    it('should list courses by category', async () => {
      // Arrange
      const categoryId = '123e4567-e89b-12d3-a456-426614174050';
      const courses = [
        {
          id: courseId,
          title: 'JS Course',
          description: 'JavaScript',
          instructorId,
          categoryId,
          price: 99.99,
        },
      ];

      mockCourseRepository.findByCategoryId.mockResolvedValue({
        courses,
        total: 1,
      });

      // Act
      const result = await courseService.listByCategory(categoryId, 1, 10);

      // Assert
      expect(mockCourseRepository.findByCategoryId).toHaveBeenCalledWith(
        categoryId,
        1,
        10
      );
      expect(result.courses).toHaveLength(1);
      expect(result.courses[0].categoryId).toBe(categoryId);
    });

    it('should return empty list for category with no courses', async () => {
      // Arrange
      const categoryId = '123e4567-e89b-12d3-a456-426614174050';
      mockCourseRepository.findByCategoryId.mockResolvedValue({
        courses: [],
        total: 0,
      });

      // Act
      const result = await courseService.listByCategory(categoryId, 1, 10);

      // Assert
      expect(result.courses).toHaveLength(0);
    });
  });

  describe('listByInstructor', () => {
    it('should list courses by instructor', async () => {
      // Arrange
      const courses = [
        {
          id: courseId,
          title: 'Course 1',
          description: 'Desc',
          instructorId,
          categoryId: '123e4567-e89b-12d3-a456-426614174050',
          price: 99.99,
        },
      ];

      mockCourseRepository.findByInstructorId.mockResolvedValue(courses);

      // Act
      const result = await courseService.listByInstructor(instructorId);

      // Assert
      expect(mockCourseRepository.findByInstructorId).toHaveBeenCalledWith(
        instructorId
      );
      expect(result).toHaveLength(1);
      expect(result[0].instructorId).toBe(instructorId);
    });

    it('should return empty array when instructor has no courses', async () => {
      // Arrange
      mockCourseRepository.findByInstructorId.mockResolvedValue([]);

      // Act
      const result = await courseService.listByInstructor(instructorId);

      // Assert
      expect(result).toHaveLength(0);
    });
  });

  describe('getById', () => {
    it('should get course by ID', async () => {
      // Arrange
      const course = {
        id: courseId,
        title: 'Test Course',
        description: 'Test Desc',
        instructorId,
        categoryId: '123e4567-e89b-12d3-a456-426614174050',
        price: 99.99,
      };

      mockCourseRepository.findById.mockResolvedValue(course);

      // Act
      const result = await courseService.getById(courseId);

      // Assert
      expect(mockCourseRepository.findById).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(course);
    });

    it('should throw ApplicationError when course not found', async () => {
      // Arrange
      mockCourseRepository.findById.mockReturnValue(null);

      // Act & Assert
      await expect(courseService.getById(courseId)).rejects.toThrow(
        ApplicationError
      );
    });
  });

  describe('update', () => {
    it('should update course when instructor owns it', async () => {
      // Arrange
      const existingCourse = {
        id: courseId,
        title: 'Old Title',
        description: 'Old Desc',
        instructorId,
        categoryId,
        price: 99.99,
      };

      const updateData = {
        title: 'New Title',
        description: 'New Desc',
        price: 149.99,
      };

      mockCourseRepository.findById.mockReturnValue(existingCourse);
      mockCourseRepository.update.mockReturnValue({
        ...existingCourse,
        ...updateData,
      });

      // Act
      const result = await courseService.update(courseId, updateData, instructorId);

      // Assert
      expect(mockCourseRepository.findById).toHaveBeenCalledWith(courseId);
      expect(mockCourseRepository.update).toHaveBeenCalled();
      expect(result.title).toBe('New Title');
    });

    it('should throw error when instructor does not own course', async () => {
      // Arrange
      const existingCourse = {
        id: courseId,
        title: 'Test Course',
        description: 'Test Desc',
        instructorId: '123e4567-e89b-12d3-a456-426614174002',
        categoryId,
        price: 99.99,
      };

      mockCourseRepository.findById.mockReturnValue(existingCourse);

      // Act & Assert
      await expect(
        courseService.update(courseId, { title: 'New' }, instructorId)
      ).rejects.toThrow(ApplicationError);
    });

    it('should throw error when course not found', async () => {
      // Arrange
      mockCourseRepository.findById.mockReturnValue(null);

      // Act & Assert
      await expect(
        courseService.update(courseId, { title: 'New' }, instructorId)
      ).rejects.toThrow(ApplicationError);
    });
  });

  describe('delete', () => {
    it('should soft delete course when instructor owns it', async () => {
      // Arrange
      const course = {
        id: courseId,
        title: 'Test Course',
        description: 'Test Desc',
        instructorId,
        categoryId,
        price: 99.99,
        deletedAt: null,
      };

      mockCourseRepository.findById.mockReturnValue(course);
      mockCourseRepository.softDelete.mockReturnValue(undefined);

      // Act
      await courseService.delete(courseId, instructorId);

      // Assert
      expect(mockCourseRepository.softDelete).toHaveBeenCalledWith(courseId);
    });

    it('should throw error when instructor does not own course', async () => {
      // Arrange
      const course = {
        id: courseId,
        title: 'Test Course',
        instructorId: '123e4567-e89b-12d3-a456-426614174002',
        categoryId,
        price: 99.99,
      };

      mockCourseRepository.findById.mockReturnValue(course);

      // Act & Assert
      await expect(courseService.delete(courseId, instructorId)).rejects.toThrow(
        ApplicationError
      );
    });

    it('should throw error when course not found', async () => {
      // Arrange
      mockCourseRepository.findById.mockReturnValue(null);

      // Act & Assert
      await expect(courseService.delete(courseId, instructorId)).rejects.toThrow(
        ApplicationError
      );
    });
  });

  describe('getStudents', () => {
    it('should get course students when instructor owns it', async () => {
      // Arrange
      const course = {
        id: courseId,
        title: 'Test Course',
        instructorId,
        categoryId,
        price: 99.99,
      };

      const students = [
        {
          id: '123e4567-e89b-12d3-a456-426614174003',
          name: 'Student 1',
          email: 'student1@test.com',
        },
      ];

      mockCourseRepository.findById.mockReturnValue(course);
      mockCourseRepository.findStudents.mockReturnValue(students);

      // Act
      const result = await courseService.getStudents(courseId, instructorId);

      // Assert
      expect(mockCourseRepository.findStudents).toHaveBeenCalledWith(courseId);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Student 1');
    });

    it('should return empty array when course has no students', async () => {
      // Arrange
      const course = {
        id: courseId,
        title: 'Test Course',
        instructorId,
        categoryId,
        price: 99.99,
      };

      mockCourseRepository.findById.mockReturnValue(course);
      mockCourseRepository.findStudents.mockReturnValue([]);

      // Act
      const result = await courseService.getStudents(courseId, instructorId);

      // Assert
      expect(result).toHaveLength(0);
    });

    it('should throw error when instructor does not own course', async () => {
      // Arrange
      const course = {
        id: courseId,
        title: 'Test Course',
        instructorId: '123e4567-e89b-12d3-a456-426614174002',
        categoryId,
        price: 99.99,
      };

      mockCourseRepository.findById.mockReturnValue(course);

      // Act & Assert
      await expect(
        courseService.getStudents(courseId, instructorId)
      ).rejects.toThrow(ApplicationError);
    });

    it('should throw error when course not found', async () => {
      // Arrange
      mockCourseRepository.findById.mockReturnValue(null);

      // Act & Assert
      await expect(
        courseService.getStudents(courseId, instructorId)
      ).rejects.toThrow(ApplicationError);
    });
  });
});
