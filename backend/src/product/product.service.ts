import {BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>
    ) {}

    public async getAll(searchTerm?: string, sort?: string) {
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
        return this.productModel
            .find(searchTermOptions)
            .select('-updatedAt -__v')
            .sort(sortOptions)
            .exec()
    }

    public async create(dto: any): Promise<ProductDocument> {
        return await this.productModel.create(dto)
    }
}
