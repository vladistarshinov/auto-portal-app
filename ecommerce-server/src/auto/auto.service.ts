import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AutoErrorConstants } from 'common/constants/error.constants';
import { Model } from 'mongoose';
import { AutoCharacteristicService } from 'src/auto-characteristic/auto-characteristic.service';
import { Auto, AutoDocument } from './schema/auto.schema';

@Injectable()
export class AutoService {
	constructor(
		@InjectModel(Auto.name)
		private readonly autoModel: Model<AutoDocument>,
		private readonly autoCharacteristicService: AutoCharacteristicService
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

		const data = await this.autoModel
			.find(searchTermOptions)
			.select('-updatedAt -__v')
			.sort(sortOptions)
			.skip(page)
			.limit(limitOfPages)
			.exec()

		const count = await this.autoModel.count()
		return {
			data,
			total: count,
			current_page: Number(page) + 1,
			from: 1,
			to: Math.floor(count / limitOfPages)
		}
	}


	public async create(dto: any) {
		const existAuto = await this.findBySlug(dto.slug)
		if (existAuto)
			throw new BadRequestException(AutoErrorConstants.IS_EXIST)

		const newAuto = new this.autoModel(dto)

		return newAuto.save()
	}

	public async update(_id: string, dto: any) {
		const auto = await this.autoModel.findById(_id)

		if (dto.title) auto.title = dto.title
		if (dto.brand) auto.brand = dto.brand
		if (dto.slug) auto.slug = dto.slug
		if (dto.vin) auto.vin = dto.vin
		if (dto.year) auto.year = dto.year
		if (dto.imageUrl) auto.imageUrl = dto.imageUrl
		if (dto.videoUrl) auto.videoUrl = dto.videoUrl
		if (dto.transmission) auto.transmission = dto.transmission
		if (dto.engine) auto.engine = dto.engine
		if (dto.engineVolume) auto.engineVolume = dto.engineVolume
		if (dto.driveUnit) auto.driveUnit = dto.driveUnit
		if (dto.oldPrice) auto.oldPrice = dto.oldPrice
		if (dto.price) auto.price = dto.price
		if (dto.countInStock) auto.countInStock = dto.countInStock
		if (dto.bodyType) auto.bodyType = dto.bodyType
		if (dto.power) auto.power = dto.power
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

	public async getBySlug(slug: string): Promise<any> {
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

	private async findBySlug(slug: string): Promise<any> {
		const auto = await this.autoModel.findOne({ slug })
			.select('-__v')
			.exec();
		if (!auto) throw new NotFoundException(AutoErrorConstants.NOT_FOUND)
		return auto
	}
}
