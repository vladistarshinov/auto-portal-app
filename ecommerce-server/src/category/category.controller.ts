import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './schema/category.schema';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    public getCategories(
        @Query('search') searchTerm?: string,
        @Query('sort') sort?: string
    ) {
        return this.categoryService.getAll(searchTerm, sort)
    }

    @Get(':slug')
    public getCategoryBySlug(@Param('slug') slug: string): Promise<Category> {
        return this.categoryService.getBySlug(slug)
    }

    @HttpCode(200)
    @Auth('admin')
    @Post()
    public createCategory(@Body() dto: CategoryDto): Promise<Category> {
        return this.categoryService.create(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth('admin')
    @Put(':id')
    public updateCategory(
        @Param('id', IdValidationPipe) id: string,
        @Body() dto: CategoryDto
    ): Promise<Category> {
        return this.categoryService.update(id, dto)
    }

    @HttpCode(200)
    @Auth('admin')
    @Delete(':id')
    public deleteCategory(@Param('id', IdValidationPipe) id: string): Promise<Category> {
        return this.categoryService.delete(id)
    }
}
