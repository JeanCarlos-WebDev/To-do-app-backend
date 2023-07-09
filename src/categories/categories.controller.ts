import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import type { users as User}  from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @GetUser('id') user: Pick<User, 'id'>) {
    return this.categoriesService.create({...createCategoryDto, user_id: user.id});
  }
  @Get()
  findAll(@GetUser() user: User ) {
    return this.categoriesService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @GetUser('id') user: User) {
    return this.categoriesService.findOne(id, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @GetUser('id') user: User) {
    return this.categoriesService.update(id, updateCategoryDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
