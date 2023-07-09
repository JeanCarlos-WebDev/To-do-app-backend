import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { users as IUser } from '@prisma/client';

UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser('id') user: Pick<IUser, 'id'>) {
    return this.tasksService.create({...createTaskDto, user_id: user.id});
  }

  @Get()
  findAll( @GetUser('id') user: Pick<IUser, 'id'>) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @GetUser('id') user: Pick<IUser, 'id'>) {
    return this.tasksService.findOne(id, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @GetUser('id') user: Pick<IUser, 'id'>) {
    return this.tasksService.update(id, {...updateTaskDto, user_id: user.id} );
  }

  @Delete(':id')
  remove(@Param('id') id: number, @GetUser('id') user: Pick<IUser, 'id'>) {
    return this.tasksService.remove(id);
  }
}
