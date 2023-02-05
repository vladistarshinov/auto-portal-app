import {Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AllProductResponse } from './product.interface';
import { ProductService } from './product.service';
import {Product, ProductDocument } from './schema/product.schema';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    public async getProducts(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('search') searchTerm?: string,
        @Query('sort') sort?: string
    ): Promise<AllProductResponse> {
        return await this.productService.getAll(page, limit, searchTerm, sort)
    }

    @Get('top')
    public async getTopProducts(): Promise<ProductDocument[]> {
        return await this.productService.getTop()
    }

    @Get(':id')
    public async getProductById(
        @Param('id', IdValidationPipe) id: Types.ObjectId
    ): Promise<Omit<ProductDocument, 'isSendTelegram | __v'>> {
        return await this.productService.getById(id)
    }

    @Get('by-slug/:slug')
    public async getProduct(
      @Param('slug') slug: string
    ): Promise<Omit<ProductDocument, 'isSendTelegram | __v'>> {
        return await this.productService.getBySlug(slug)
    }

    @Get('by-category/:categoryId')
    public async getProductsByCategory(
        @Param('categoryId', IdValidationPipe) categoryId: Types.ObjectId
    ): Promise<ProductDocument[]> {
        return await this.productService.getByCategory(categoryId)
    }

    @Post()
    public async createProduct(
        @Body() dto: CreateProductDto
    ): Promise<ProductDocument> {
        return this.productService.create(dto)
    }

    @Patch(':id')
    public async updateProduct(
        @Param('id', IdValidationPipe) id: string,
        @Body() dto: UpdateProductDto
    ): Promise<ProductDocument> {
        return this.productService.update(id, dto)
    }

    @Delete(':id')
    public async deleteProduct(
        @Param('id', IdValidationPipe) id: string
    ): Promise<void> {
        return this.productService.delete(id)
    }
}
