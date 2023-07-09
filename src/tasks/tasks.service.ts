import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService){}
  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.tasks.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        pomodoros: createTaskDto.pomodoros,
        number_of_pomodoros: createTaskDto['number_of_pomodoros'],
        user_id: createTaskDto.user_id,
        importance: createTaskDto.importance,
        category_id: createTaskDto.category_id
      }
    })
    return task;
  }

  async findByCategory(category_id: number, user_id: number) {
    const tasksByCategory = await this.prisma.tasks.findMany({
      include: {
        category: {
          select: {
            id: true,
            title: true
          }
        }
      },
      where: {
        category_id,
        user_id
      }
    })
    return tasksByCategory
  }

  async findByCategoryTitle(category_title: string, user_id: number) {
    const category = await this.prisma.categories.findFirstOrThrow({
      where: {
        title: category_title,
        user_id
      }
    })
    return await this.findByCategory(category.id, user_id )
  }

  async findAll(user_id: number) {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        user_id
      }
    })
    return tasks;
  }

  async findOne(id: number, user_id: number) {
    try {
      const task = await this.prisma.tasks.findFirstOrThrow({ where: { id, user_id } })
      return task;
    } catch (err) {
      throw new NotFoundException('Task not found')
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.prisma.tasks.update({
        where: { id }, data: {
          title: updateTaskDto.title,
          description: updateTaskDto.description,
          status: updateTaskDto.status,
          pomodoros: updateTaskDto.pomodoros,
          number_of_pomodoros: updateTaskDto['number_of_pomodoros'],
          user_id: updateTaskDto.user_id,
          importance: updateTaskDto.importance,
        }
      })
      
      return task
    } catch (err) {
      throw new NotFoundException('Task not found')
    }
  }

  async remove(id: number) {
    await this.prisma.tasks.delete({
      where: { id }
    })
    return {statusCode: 201, message: 'Task deleted succesfully'}
  }
}
