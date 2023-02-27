import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductErrorConstants } from 'common/constants/error.constants';
import { Model, Types } from 'mongoose';
import { ReviewService } from 'src/review/review.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AllProductResponse } from './product.interface';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
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

    public async getById(id: Types.ObjectId): Promise<ProductDocument> {
        const product = await this.productModel.findById(id)
              .populate({
                  path: 'category',
                  select: '-__v'
              })
              .populate({
                  path: 'reviews',
                  model: 'Review',
                  select: '-__v',
                  populate: {
                      path: 'user',
                      model: 'User',
                      select: '_id firstName lastName'
                  }
              })
              .select('-isSendTelegram -__v')
        //const reviews = await this.reviewService.getByProduct(id)
        if (!product) throw new NotFoundException(ProductErrorConstants.NOT_FOUND)
        //reviews: reviews
        return product
    }

    public async getBySlug(slug: string) {
        const product = await this.productModel.findOne({ slug })
          .populate({
              path: 'category',
              select: '-__v'
          })
          .populate({
              path: 'reviews',
              model: 'Review',
              select: '-__v',
              populate: {
                  path: 'user',
                  model: 'User',
                  select: '_id firstName lastName'
              }
          })
          .select('-isSendTelegram -__v')
          .exec();
        //const reviews = await this.reviewService.getByProduct(id)
        if (!product) throw new NotFoundException(ProductErrorConstants.NOT_FOUND)
        //reviews: reviews
        return product
    }

    public async getByCategory(categoryId: Types.ObjectId): Promise<ProductDocument[]> {
        const products = await this.productModel
            .find({ category: categoryId })
        if (!products) throw new NotFoundException(ProductErrorConstants.NOT_FOUND);
        return products
    }

    public async create(dto: CreateProductDto) {
        return await this.productModel.create({...dto, category: String(dto.categoryId)})
    }

    public async update(_id: string, dto: UpdateProductDto): Promise<ProductDocument> {
        const product = await this.productModel.findById(_id)

        if (dto.title) product.title = dto.title
        if (dto.description) product.description = dto.description
        if (dto.slug) product.slug = dto.slug
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

    public async updateRating(id: Types.ObjectId, newRating: number, mode: string, reviewId: Types.ObjectId) {
        const product = await this.productModel.findById(id)

        let reviews = mode === 'C' ? product.reviews?.concat([reviewId]) : product.reviews.filter((r: Types.ObjectId) => String(r) !== String(reviewId))
        product.rating = newRating ?? 0
        product.countOfReviews = mode === 'C' ? product.countOfReviews + 1 : product.countOfReviews - 1
        product.reviews = reviews
        return await product.save();
    }

    public async checkProductCountInStock(id: Types.ObjectId, quantity: number) {
        const productInStock = await this.productModel
            .findById(id)
            .select('title countInStock')
            .then((res) => ({title: res.title, countInStock: res.countInStock}))

        //if (productInStock.countInStock < quantity) throw new BadRequestException(`Количество товара ${productInStock.title} меньше запрашиваемого`)

        return {
            id,
            title: productInStock.title,
            countInStock: productInStock.countInStock,
            quantity: quantity,
            error: productInStock.countInStock < quantity ? true : false
        }
    }

    public async updateProductCountInStock(id: Types.ObjectId, inStock: number, quantity: number) {
        const product = await this.productModel.findById(id)
        product.countInStock = inStock - quantity
        return await product.save()
    }
}
