import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/category.dto';
import {Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<CategoryDocument>
    ) {}

    public async getAll(searchTerm?: string, sort?: string) {
        let searchTermOptions = {}
        let sortOptions = {}
        if (searchTerm) {
            searchTermOptions = {
                $or: [
                    {
                        title: new RegExp(searchTerm, 'i')
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
        return this.categoryModel
            .find(searchTermOptions)
            .select('-updatedAt -__v')
            .sort(sortOptions)
            .exec()
    }

    public async getBySlug(slug: string): Promise<Category> {
        const category = await this.categoryModel.findOne({ slug }).exec()
        if (!category) throw new NotFoundException('Category is not found')
        return category
    }

    public async getById(_id: string): Promise<Category> {
        const category = await this.categoryModel.findById(_id)
        if (!category) throw new NotFoundException('Такая категория уже существует')
        return category
    }

    public async create(dto: CategoryDto) {
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

    public async update(_id: string, dto: CategoryDto): Promise<Category> {
        const category = await this.categoryModel.findById(_id)
        const sameCategory = await this.categoryModel.findOne({title: dto.title})
        if (sameCategory && String(_id) !== String(sameCategory._id))
            throw new NotFoundException('Такая категория уже существует')

        category.title = dto.title
        category.slug = dto.slug
        category.description = dto.description
        category.icon = dto.icon

        return await category.save()
    }

    public async delete(id: string): Promise<Category> {
        return this.categoryModel.findByIdAndDelete(id).exec()
    }

    private async findByTitle(title: string): Promise<Category> {
        return await this.categoryModel.findOne({ title })
    }
}
