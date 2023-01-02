import {BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<CategoryDocument>
    ) {}

    public async create(dto: any) {
        const category = await this.findByTitle(dto.title)
        if (category)
            throw new BadRequestException('Такая категория уже существует')

        const newCategory = new this.categoryModel({
            title: dto.title,
            slug: dto.slug,
            description: dto.description,
            icon: dto.icon
        })

        return newCategory.save()

    }

    private async findByTitle(title: string): Promise<any> {
        return await this.categoryModel.findOne({ title })
    }
}
