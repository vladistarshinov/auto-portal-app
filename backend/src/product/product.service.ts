import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AllProductResponse } from './product.interface';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>
    ) {}

    public async getAll(
        page: number = 0,
        limitOfPages?: number,
        searchTerm?: string,
        sort?: string
    ):  Promise<AllProductResponse> {
        let searchTermOptions = {}
        let sortOptions = {}
        if (searchTerm) {
            searchTermOptions = {
                $or: [
                    {
                        title: new RegExp(searchTerm, 'i')
                    },
                    {
                        slug: new RegExp(searchTerm, 'i')
                    },
                    {
                        description: new RegExp(searchTerm, 'i')
                    }
                ]
            }
        }
        if (sort !== undefined && sort.includes('createdAt')) {
            if (sort[0] === '-')
                sortOptions = {
                    createdAt: 'desc'
                }
            else
                sortOptions = {
                    createdAt: 'asc'
                }
        } else if (sort !== undefined && sort.includes('title')) {
            if (sort[0] === '-')
                sortOptions = {
                    title: 'desc'
                }
            else
                sortOptions = {
                    title: 'asc'
                }
        } else {
            sortOptions = {
                createdAt: 'desc'
            }
        }

        const res = await this.productModel
            .find(searchTermOptions)
            .select('-updatedAt -__v')
            .sort(sortOptions)
            .skip(page)
            .limit(limitOfPages)
            .exec()

        const count = await this.productModel.count()
        return {
            res,
            total: count,
            current_page: Number(page) + 1,
            from: 1,
            to: Math.floor(count / limitOfPages)
        }
    }

    public async getTop(): Promise<ProductDocument[]> {
        const products = await this.productModel.find({}).sort({ rating: -1 }).limit(3);
        return products;
    }

    public async getById(id: string): Promise<Omit<ProductDocument, 'isSendTelegram | __v'>> {
        const product = await this.productModel.findById(id).populate('category').select('-isSendTelegram -__v')
        if (!product) throw new NotFoundException('Товар не найден')
        return product
    }

    public async getByCategory(categoryId: Types.ObjectId): Promise<ProductDocument[]> {
        const products = await this.productModel
            .find({ category: categoryId })
        if (!products) throw new NotFoundException('Products is not found');
        return products
    }

    public async create(dto: CreateProductDto) {
        return await this.productModel.create({...dto, category: String(dto.categoryId)})
    }

    public async update(_id: string, dto: UpdateProductDto): Promise<ProductDocument> {
        const product = await this.productModel.findById(_id)

        if (dto.title) product.title = dto.title
        if (dto.description) product.description = dto.description
        if (dto.imageUrl) product.imageUrl = dto.imageUrl
        if (dto.videoUrl) product.videoUrl = dto.videoUrl
        if (dto.brand) product.brand = dto.brand
        if (dto.oldPrice) product.oldPrice = dto.oldPrice
        if (dto.price) product.price = dto.price
        if (dto.countInStock) product.countInStock = dto.countInStock
        if (dto.categoryId) product.category = dto.categoryId

        return await product.save()
    }

    public async delete(id: string): Promise<void> {
        this.productModel.findByIdAndDelete(id).exec()
    }

    public async updateRating(id: Types.ObjectId, newRating: number) {
        return await this.productModel
            .findOneAndUpdate(
                {
                    product: id
                },
                {
                    rating: newRating
                },
                {
                    new: true
                }
            )
            .exec()
    }
}
