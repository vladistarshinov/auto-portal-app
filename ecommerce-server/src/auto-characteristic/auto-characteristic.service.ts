import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AutoErrorConstants } from 'common/constants/error.constants';
import { Model } from 'mongoose';
import { AutoCharacteristic, AutoCharacteristicDocument } from './schema/auto-characteristic.schema';

@Injectable()
export class AutoCharacteristicService {
	constructor(
		@InjectModel(AutoCharacteristic.name)
		private readonly autoCharacteristicModel: Model<AutoCharacteristicDocument>,
	) {}

	public async findByVin(vin: string): Promise<any> {
		const auto = await this.autoCharacteristicModel.findOne({ vin })
			.select('-__v')
			.exec();
		if (auto) throw new NotFoundException(AutoErrorConstants.NOT_FOUND)
		return auto
	}

	public async create(dto: any) {
		const existAuto = await this.findByVin(dto.vin)
		if (existAuto)
			throw new BadRequestException(AutoErrorConstants.IS_EXIST)

		const newAuto = new this.autoCharacteristicModel(dto)

		return newAuto.save()
	}

	public async update(_id: string, dto: any) {
		const autoTechChar = await this.autoCharacteristicModel.findById(_id)

		if (dto.vin) autoTechChar.vin = dto.vin
		if (dto.year) autoTechChar.year = dto.year
		if (dto.transmission) autoTechChar.transmission = dto.transmission
		if (dto.engineType) autoTechChar.engineType = dto.engineType
		if (dto.engineVolume) autoTechChar.engineVolume = dto.engineVolume
		if (dto.enginePower) autoTechChar.enginePower = dto.enginePower
		if (dto.driveUnit) autoTechChar.driveUnit = dto.driveUnit
		if (dto.bodyType) autoTechChar.bodyType = dto.bodyType
		if (dto.steering) autoTechChar.steering = dto.steering
		if (dto.mileage) autoTechChar.mileage = dto.mileage

		return await autoTechChar.save()
	}

	public async delete(_id: string): Promise<void> {
		await this.autoCharacteristicModel.findByIdAndDelete(_id).exec()
	}
}
