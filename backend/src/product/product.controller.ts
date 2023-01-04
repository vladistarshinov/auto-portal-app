import {Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    public async getProducts(
        @Query('search') searchTerm?: string,
        @Query('sort') sort?: string
    ) {
        return await this.productService.getAll(searchTerm, sort)
    }

    @Post()
    public async createCategory(@Body() dto: any): Promise<any> {
        return this.productService.create(dto)
    }
}
