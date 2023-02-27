import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auto, AutoDocument } from './schema/auto.schema';

@Injectable()
export class AutoService {
	constructor(
		@InjectModel(Auto.name)
		private readonly autoModel: Model<AutoDocument>,
	) {}

	public async getAll(
		page: number = 0,
		limitOfPages?: number,
		searchTerm?: string,
		sort?: string
	):  Promise<any> {
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
						vin: new RegExp(searchTerm, 'i')
					},
					{
						year: new RegExp(searchTerm, 'i')
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
		} else if (sort !== undefined && sort.includes('year')) {
			if (sort[0] === '-')
				sortOptions = {
					year: 'desc'
				}
			else
				sortOptions = {
					year: 'asc'
				}
		} else {
			sortOptions = {
				year: 'desc'
			}
		}

		const res = await this.autoModel
			.find(searchTermOptions)
			.select('-updatedAt -__v')
			.sort(sortOptions)
			.skip(page)
			.limit(limitOfPages)
			.exec()

		const count = await this.autoModel.count()
		return {
			res,
			total: count,
			current_page: Number(page) + 1,
			from: 1,
			to: Math.floor(count / limitOfPages)
		}
	}

	public async getBySlug(slug: string) {
		const product = await this.autoModel.findOne({ slug })
			.select('-__v')
			.exec();
		if (!product) throw new NotFoundException('Автомобиль не обнаружен!')
		return product
	}

	public async create(dto: any) {
		return dto
	}

	public async update(_id: string, dto: any) {
		return dto
	}

	public async delete(_id: string): Promise<void> {

	}
}
