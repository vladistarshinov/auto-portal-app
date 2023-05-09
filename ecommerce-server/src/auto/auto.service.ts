import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AutoErrorConstants } from 'common/constants/error.constants';
import { Model } from 'mongoose';
import qs, { ParsedQs } from 'qs';
import { AutoCharacteristicService } from 'src/auto-characteristic/auto-characteristic.service';
import { CreateAutoDto } from './dto/create-auto.dto';
import { FiltersDto } from './dto/filters.dto';
import { UpdateAutoDto } from './dto/update-auto.dto';
import { Auto, AutoDocument } from './schema/auto.schema';

@Injectable()
export class AutoService {
	constructor(
		@InjectModel(Auto.name)
		private readonly autoModel: Model<AutoDocument>,
		private readonly autoCharacteristicService: AutoCharacteristicService
	) {}

	public async getAll(
		page?: number,
		limitOfPages?: number,
		searchTerm?: string,
		sort?: string,
		filters?: FiltersDto
	) {
		let newFilters = filters
		let searchTermOptions = {}
		let filterOptions = {}
		let sortOptions = {}
		if (searchTerm) {
			searchTermOptions = {
				$and: [
					{
						title: new RegExp(searchTerm, 'i')
					},
					{
						year: new RegExp(searchTerm, 'i')
					}
				]
			}
		}

		if (filters && Object.keys(newFilters).length) {
			if (newFilters.hasOwnProperty('price')) {
				filterOptions['price'] = {
					"$gte": String(newFilters['price']).split(',')[0],
					"$lt": String(newFilters['price']).split(',')[1],
				}
			}
			if (newFilters.hasOwnProperty('brand')) {
				let brands = String(newFilters['brand']).split(',')
				filterOptions['brand'] = [...brands]
			}
			if (newFilters.hasOwnProperty('color')) {
				filterOptions['color'] = { $eq: newFilters['color']  }
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
		} else if (sort !== undefined && sort.includes('price')) {
			if (sort[0] === '-')
				sortOptions = {
					price: 'desc'
				}
			else
				sortOptions = {
					price: 'asc'
				}
		} else {
			sortOptions = {
				createdAt: 'desc'
			}
		}

		const data = await this.autoModel
			.find({...searchTermOptions, ...filterOptions})
			.select('-updatedAt -__v')
			.sort(sortOptions)
			.populate({
				path: 'characteristics',
				select: '-__v -createdAt -updatedAt -_id',
			})
			.skip((page - 1) * limitOfPages)
			.limit(limitOfPages)
			.exec()

		const count = await this.autoModel.count()
		return {
			data,
			total: count,
			current_page: +page,
			per_page: +limitOfPages,
			from: 1,
			to: Math.floor(count / limitOfPages)
		}
	}


	public async create(dto: CreateAutoDto): Promise<Auto> {
		const existAuto = await this.findBySlug(dto.slug)
		if (existAuto)
			throw new BadRequestException(AutoErrorConstants.IS_EXIST)

		const newAuto = new this.autoModel(dto)
		return newAuto.save()

	}

	public async update(_id: string, dto: Partial<UpdateAutoDto>): Promise<Auto> {
		const auto = await this.autoModel.findById(_id)

		if (dto.title) auto.title = dto.title
		if (dto.brand) auto.brand = dto.brand
		if (dto.slug) auto.slug = dto.slug
		if (dto.imageUrl) auto.imageUrl = dto.imageUrl
		if (dto.videoUrl) auto.videoUrl = dto.videoUrl
		if (dto.oldPrice) auto.oldPrice = dto.oldPrice
		if (dto.price) auto.price = dto.price
		if (dto.countInStock) auto.countInStock = dto.countInStock
		if (dto.color) auto.color = dto.color

		return await auto.save()
	}

	public async delete(_id: string): Promise<void> {
		const auto = await this.autoModel.findById(_id)
		//const autoCharId = auto.characteristics
		//await this.autoCharacteristicService.delete(autoCharId)
		await this.autoModel.findByIdAndDelete(_id).exec()
	}

	public async getByBrand(brand:string): Promise<any[]> {
		const auto = await this.autoModel
			.find({ brand })
		if (!auto) throw new NotFoundException(AutoErrorConstants.NOT_FOUND_BRAND);
		return auto
	}

	public async getBySlug(slug: string): Promise<Omit<Auto, '-__v' | '-createdAt' | '-updatedAt' | '-_id'>> {
		const auto = await this.autoModel.findOne({ slug })
			.populate({
				path: 'characteristics',
				select: '-__v -createdAt -updatedAt -_id'
			})
			.select('-__v')
			.exec();
		if (!auto) throw new NotFoundException(AutoErrorConstants.NOT_FOUND)
		return auto
	}

	public async getBrands(): Promise<string[]> {
		return await this.autoModel.find().distinct('brand').exec();
	}

	private async findBySlug(slug: string): Promise<any> {
		const auto = await this.autoModel.findOne({ slug })
			.select('-__v')
			.exec();
		if (auto) throw new NotFoundException(AutoErrorConstants.NOT_FOUND)
		return auto
	}
}
