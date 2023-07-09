import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.categories.create({
      data: {
        title: createCategoryDto.title,
        user_id: createCategoryDto.user_id
      },
    });

    return category;
  }

  async findAll(user_id: number) {
    const categories = await this.prisma.categories.findMany({
      select: { user_id: false, id: true, title: true },
      where: { user_id }
    })
    return categories;
  }

  async findOne(id: number, user_id: number) {
    try {
      const category = await this.prisma.categories.findFirstOrThrow({
        select: { user_id: false, id: true, title: true },
        where: { id, user_id }
      })
      return category;
    } catch (err: any) {
      if (err?.code && err.code == 'P2025') {
        throw new NotFoundException('Category not found')
      }
    }
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto, user_id: number) {
    const updatedCategory = await this.prisma.categories.update({
      where: { id },
      select: {
        user_id: true,
        title: true
      },
      data: { title: updateCategoryDto.title },
    })
    if (updatedCategory.user_id !== user_id) throw new ForbiddenException('Acces denied');
    return updatedCategory
    
  }

  async remove(id: number) {
      await this.prisma.categories.delete({ where: { id } })
      return { status: 200, message: 'Category deleted sucessfully' };
  }
}