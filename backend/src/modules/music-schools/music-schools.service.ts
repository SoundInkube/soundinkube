import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMusicSchoolDto } from './dto/create-music-school.dto';
import { UpdateMusicSchoolDto } from './dto/update-music-school.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { UserRole, EnrollmentStatus } from '@prisma/client';

@Injectable()
export class MusicSchoolsService {
  constructor(private prisma: PrismaService) {}

  // Music School Management
  async createMusicSchool(createDto: CreateMusicSchoolDto, userId: string) {
    return this.prisma.musicSchool.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        address: createDto.address,
        city: createDto.city,
        state: createDto.state,
        postalCode: createDto.postalCode,
        country: createDto.country,
        website: createDto.website,
        phoneNumber: createDto.phoneNumber,
        email: createDto.email,
        facilities: createDto.facilities,
        images: createDto.images,
        latitude: createDto.latitude,
        longitude: createDto.longitude,
        establishedYear: createDto.establishedYear,
        specialties: createDto.specialties,
        owner: {
          connect: { id: userId },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllMusicSchools(skip = 0, take = 10, filters?: any) {
    const where = {
      active: true,
      ...filters,
    };

    const schools = await this.prisma.musicSchool.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            courses: true,
            reviews: true,
          },
        },
      },
    });

    const total = await this.prisma.musicSchool.count({ where });

    return { schools, total };
  }

  async findMusicSchoolById(id: string) {
    const school = await this.prisma.musicSchool.findUnique({
      where: { id, active: true },
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        courses: {
          where: { active: true },
          take: 10,
          include: {
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
        },
        reviews: {
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            courses: true,
            reviews: true,
          },
        },
      },
    });

    if (!school) {
      throw new NotFoundException(`Music School with ID ${id} not found or inactive`);
    }

    return school;
  }

  async findUserMusicSchools(userId: string, skip = 0, take = 10) {
    const schools = await this.prisma.musicSchool.findMany({
      where: { ownerId: userId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            courses: true,
            reviews: true,
          },
        },
      },
    });

    const total = await this.prisma.musicSchool.count({ where: { ownerId: userId } });

    return { schools, total };
  }

  async updateMusicSchool(
    id: string,
    updateDto: UpdateMusicSchoolDto,
    userId: string,
    userRole: UserRole,
  ) {
    // Check if music school exists
    const school = await this.prisma.musicSchool.findUnique({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException(`Music School with ID ${id} not found`);
    }

    // Check if user is owner or admin
    if (school.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own music schools');
    }

    // Update music school
    return this.prisma.musicSchool.update({
      where: { id },
      data: updateDto,
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteMusicSchool(id: string, userId: string, userRole: UserRole) {
    // Check if music school exists
    const school = await this.prisma.musicSchool.findUnique({
      where: { id },
      include: {
        courses: {
          include: {
            enrollments: true,
          },
        },
      },
    });

    if (!school) {
      throw new NotFoundException(`Music School with ID ${id} not found`);
    }

    // Check if user is owner or admin
    if (school.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only delete your own music schools');
    }

    // Check if there are any active enrollments
    const activeEnrollments = school.courses.flatMap((course) =>
      course.enrollments.filter((enrollment) => ['ACTIVE', 'PENDING'].includes(enrollment.status)),
    );

    if (activeEnrollments.length > 0) {
      throw new BadRequestException('Cannot delete music school with active enrollments');
    }

    // Soft delete - just mark as inactive
    return this.prisma.musicSchool.update({
      where: { id },
      data: {
        active: false,
        courses: {
          updateMany: {
            where: {},
            data: { active: false },
          },
        },
      },
    });
  }

  // Course Management
  async createCourse(schoolId: string, createDto: CreateCourseDto, userId: string) {
    // Check if music school exists and is active
    const school = await this.prisma.musicSchool.findUnique({
      where: { id: schoolId, active: true },
    });

    if (!school) {
      throw new NotFoundException(`Music School with ID ${schoolId} not found or inactive`);
    }

    // Check if user is the school owner or admin
    if (school.ownerId !== userId && (await this.getUserRole(userId)) !== UserRole.ADMIN) {
      throw new ForbiddenException('Only the school owner or admin can create courses');
    }

    return this.prisma.course.create({
      data: {
        title: createDto.title,
        description: createDto.description,
        price: createDto.price,
        duration: createDto.duration,
        schedule: createDto.schedule,
        instructor: createDto.instructor,
        requirements: createDto.requirements,
        level: createDto.level,
        capacity: createDto.capacity,
        startDate: createDto.startDate,
        endDate: createDto.endDate,
        images: createDto.images,
        syllabus: createDto.syllabus,
        category: createDto.category,
        musicSchool: {
          connect: { id: schoolId },
        },
      },
      include: {
        musicSchool: {
          select: {
            id: true,
            name: true,
            city: true,
            country: true,
          },
        },
      },
    });
  }

  async findAllCourses(skip = 0, take = 10, filters?: any) {
    const where = {
      active: true,
      musicSchool: {
        active: true,
      },
      ...filters,
    };

    const courses = await this.prisma.course.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        musicSchool: {
          select: {
            id: true,
            name: true,
            city: true,
            country: true,
            images: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    const total = await this.prisma.course.count({ where });

    return { courses, total };
  }

  async findCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id, active: true },
      include: {
        musicSchool: {
          select: {
            id: true,
            name: true,
            description: true,
            city: true,
            country: true,
            images: true,
            owner: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!course || !course.musicSchool) {
      throw new NotFoundException(
        `Course with ID ${id} not found, inactive, or belongs to inactive school`,
      );
    }

    return course;
  }

  async findSchoolCourses(schoolId: string, skip = 0, take = 10) {
    // Check if music school exists and is active
    const school = await this.prisma.musicSchool.findUnique({
      where: { id: schoolId, active: true },
    });

    if (!school) {
      throw new NotFoundException(`Music School with ID ${schoolId} not found or inactive`);
    }

    const courses = await this.prisma.course.findMany({
      where: {
        musicSchoolId: schoolId,
        active: true,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    const total = await this.prisma.course.count({
      where: {
        musicSchoolId: schoolId,
        active: true,
      },
    });

    return { courses, total };
  }

  async updateCourse(id: string, updateDto: UpdateCourseDto, userId: string, userRole: UserRole) {
    // Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        musicSchool: true,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Check if user is school owner or admin
    if (course.musicSchool.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only the school owner or admin can update courses');
    }

    // Update course
    return this.prisma.course.update({
      where: { id },
      data: updateDto,
      include: {
        musicSchool: {
          select: {
            id: true,
            name: true,
            city: true,
            country: true,
          },
        },
      },
    });
  }

  async deleteCourse(id: string, userId: string, userRole: UserRole) {
    // Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        musicSchool: true,
        enrollments: true,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Check if user is school owner or admin
    if (course.musicSchool.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only the school owner or admin can delete courses');
    }

    // Check if there are any active enrollments
    const activeEnrollments = course.enrollments.filter((enrollment) =>
      ['ACTIVE', 'PENDING'].includes(enrollment.status),
    );

    if (activeEnrollments.length > 0) {
      throw new BadRequestException('Cannot delete course with active enrollments');
    }

    // Soft delete - just mark as inactive
    return this.prisma.course.update({
      where: { id },
      data: { active: false },
    });
  }

  // Enrollment Management
  async createEnrollment(createDto: CreateEnrollmentDto, userId: string) {
    // Check if course exists and is active
    const course = await this.prisma.course.findUnique({
      where: {
        id: createDto.courseId,
        active: true,
        musicSchool: {
          active: true,
        },
      },
      include: {
        musicSchool: true,
        _count: {
          select: {
            enrollments: {
              where: {
                status: {
                  in: ['ACTIVE', 'PENDING'],
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(
        `Course with ID ${createDto.courseId} not found, inactive, or belongs to inactive school`,
      );
    }

    // Check if the course has reached its capacity
    if (course.capacity && course._count.enrollments >= course.capacity) {
      throw new BadRequestException('This course has reached its maximum capacity');
    }

    // Check if user is already enrolled
    const existingEnrollment = await this.prisma.enrollment.findFirst({
      where: {
        userId,
        courseId: createDto.courseId,
        status: {
          in: ['ACTIVE', 'PENDING'],
        },
      },
    });

    if (existingEnrollment) {
      throw new BadRequestException('You are already enrolled in this course');
    }

    // Create enrollment
    return this.prisma.enrollment.create({
      data: {
        status: EnrollmentStatus.PENDING,
        user: {
          connect: { id: userId },
        },
        course: {
          connect: { id: createDto.courseId },
        },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            startDate: true,
            endDate: true,
            musicSchool: {
              select: {
                id: true,
                name: true,
                city: true,
                country: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllEnrollments(skip = 0, take = 10) {
    const enrollments = await this.prisma.enrollment.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            musicSchool: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.enrollment.count();

    return { enrollments, total };
  }

  async findUserEnrollments(userId: string, skip = 0, take = 10) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
            musicSchool: {
              select: {
                id: true,
                name: true,
                city: true,
                country: true,
                images: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.enrollment.count({ where: { userId } });

    return { enrollments, total };
  }

  async findCourseEnrollments(
    courseId: string,
    userId: string,
    userRole: UserRole,
    skip = 0,
    take = 10,
  ) {
    // Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        musicSchool: true,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if user is school owner or admin
    if (course.musicSchool.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only the school owner or admin can view course enrollments');
    }

    const enrollments = await this.prisma.enrollment.findMany({
      where: { courseId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.enrollment.count({ where: { courseId } });

    return { enrollments, total };
  }

  async findSchoolEnrollments(
    schoolId: string,
    userId: string,
    userRole: UserRole,
    skip = 0,
    take = 10,
  ) {
    // Check if music school exists
    const school = await this.prisma.musicSchool.findUnique({
      where: { id: schoolId },
    });

    if (!school) {
      throw new NotFoundException(`Music School with ID ${schoolId} not found`);
    }

    // Check if user is school owner or admin
    if (school.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only the school owner or admin can view school enrollments');
    }

    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        course: {
          musicSchoolId: schoolId,
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.enrollment.count({
      where: {
        course: {
          musicSchoolId: schoolId,
        },
      },
    });

    return { enrollments, total };
  }

  async updateEnrollment(
    id: string,
    updateDto: UpdateEnrollmentDto,
    userId: string,
    userRole: UserRole,
  ) {
    // Check if enrollment exists
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            musicSchool: true,
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }

    // Determine permissions
    const isStudent = enrollment.userId === userId;
    const isSchoolOwner = enrollment.course.musicSchool.ownerId === userId;
    const isAdmin = userRole === UserRole.ADMIN;

    // Only the school owner or admin can change status
    if (updateDto.status && !isSchoolOwner && !isAdmin) {
      throw new ForbiddenException('Only the school owner or admin can update enrollment status');
    }

    // Validate status transitions
    if (updateDto.status) {
      // Cannot change status if already completed, cancelled or rejected
      if (
        ['COMPLETED', 'CANCELLED', 'REJECTED'].includes(enrollment.status) &&
        enrollment.status !== updateDto.status
      ) {
        throw new BadRequestException(
          `Cannot change status of an enrollment that is ${enrollment.status}`,
        );
      }

      // Student can only cancel
      if (isStudent && updateDto.status !== 'CANCELLED') {
        throw new ForbiddenException('Students can only cancel their enrollments');
      }
    }

    // Update enrollment
    return this.prisma.enrollment.update({
      where: { id },
      data: updateDto,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            musicSchool: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  private async getUserRole(userId: string): Promise<UserRole> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    return user?.role || UserRole.USER;
  }
}
