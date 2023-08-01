import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService){}
  async create(createTaskDto: CreateTaskDto, user_id: number) {
    const task = await this.prisma.tasks.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        pomodoros: 0,
        expiration_date: createTaskDto?.expiration_date,
        number_of_pomodoros: createTaskDto['number_of_pomodoros'],
        user_id,
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
    if (category_title == 'null') {
      return await this.prisma.tasks.findMany({where:{user_id, category_id: null}})
    }
    const category = await this.prisma.tasks.findMany({
      where: {
        user_id,
        category: {
          title: category_title,
          user_id: user_id
        }
      }
    })
    return await category
  }

  async findAll(user_id: number, importance?: number, expiration_date?: string) {
    //Find all tasks with the importance of 1 or 2
    if (importance) {
      const importantTasks = await this.prisma.tasks.findMany({
        where: {
          user_id,
          importance: {
            in: [1, 2]
          }
        }
      })
      return importantTasks
    }

    if (expiration_date) {
      const TasksByExpirationDate = await this.prisma.tasks.findMany({
        where: {
          user_id,
          expiration_date: {
            equals: expiration_date
          }
        }
      })
      return TasksByExpirationDate
    }

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

  async update(id: number, updateTaskDto: UpdateTaskDto, user_id: number) {
    try {
      const task = await this.prisma.tasks.update({
        where: { id }, data: {
          category_id: updateTaskDto.category_id,
          update_at: new Date().toISOString(),
          title: updateTaskDto.title,
          description: updateTaskDto.description,
          expiration_date: updateTaskDto.expiration_date,
          status: updateTaskDto.status,
          pomodoros: updateTaskDto.pomodoros,
          number_of_pomodoros: updateTaskDto['number_of_pomodoros'],
          user_id,
          importance: updateTaskDto.importance,
        }
      })
      
      return task
    } catch (err) {
      console.log(err)
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
