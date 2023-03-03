import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import { AutoCharacteristicService } from './auto-characteristic.service';

@Controller('auto-characteristics')
export class AutoCharacteristicController {
	constructor(private readonly autoCharacteristicService: AutoCharacteristicService) {}

	@Get('by-vin/:vin')
	public getAutoCharacteristics(
		@Param('vin') vin: string
	): Promise<any> {
		return this.autoCharacteristicService.findByVin(vin)
	}

	@Post()
	public createAutoCharacteristics(
		@Body() dto: any
	): Promise<any> {
		return this.autoCharacteristicService.create(dto)
	}

	@Put(':id')
	public updateAutoCharacteristics(
		@Param('id', IdValidationPipe) _id: string,
		@Body() dto: any
	): Promise<any> {
		return this.autoCharacteristicService.update(_id, dto)
	}

	@Delete(':id')
	public deleteAutoCharacteristics(
		@Param('id', IdValidationPipe) _id: string
	): Promise<any> {
		return this.autoCharacteristicService.delete(_id)
	}
}
