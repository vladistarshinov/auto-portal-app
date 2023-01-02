import {Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    public async createCategory(@Body() dto: any) {
        return this.categoryService.create(dto)
    }
}
