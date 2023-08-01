import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
// import { users as IUser } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser('id') user_id: number) {
    return this.tasksService.create(createTaskDto, user_id);
  }

  @Get()
  findAll( @GetUser('id')  user_id: number, @Query('importance') importance ?: number, @Query('date') expiration_date?: string) {
    return this.tasksService.findAll(user_id, importance, expiration_date);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser('id') user_id: number) {
    return this.tasksService.findOne(id, user_id);
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string, @GetUser('id') user_id: number) {
    return this.tasksService.findByCategoryTitle(id, user_id)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe ) id: number, @Body() updateTaskDto: UpdateTaskDto, @GetUser('id')  user_id: number) {
    return this.tasksService.update(id, updateTaskDto, user_id );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser('id')  user_id: number) {
    return this.tasksService.remove(id);
  }
}
