import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @GetUser('id') user: number) {
    return this.categoriesService.create(createCategoryDto, user);
  }
  @Get()
  findAll(@GetUser('id') user_id: number ) {
    return this.categoriesService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') user_id: number) {
    // if(typeof parseInt(id) == 'number' ) return this.categoriesService.findOne(id, user_id);
    return this.categoriesService.findByTitle(id, user_id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @GetUser('id') user_id: number) {
    return this.categoriesService.update(parseInt(id), updateCategoryDto, user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(parseInt(id));
  }
}
