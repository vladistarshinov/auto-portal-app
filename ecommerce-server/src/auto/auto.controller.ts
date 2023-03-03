import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import { AutoService } from './auto.service';

@Controller('autos')
export class AutoController {
	constructor(private readonly autoService: AutoService) {}

	@Get()
	public getAutos(
		@Query('page') page?: number,
		@Query('limit') limit?: number,
		@Query('search') searchTerm?: string,
		@Query('sort') sort?: string
	): Promise<any> {
		return this.autoService.getAll(page, limit, searchTerm, sort)
	}

	@Get('by-brand/:brand')
	public getAutosByBrand(
		@Param('brand') brand: string
	): Promise<any[]> {
		return this.autoService.getByBrand(brand)
	}

	@Get(':slug')
	public getAutoBySlug(
		@Param('slug') slug: string
	): Promise<any> {
		return this.autoService.getBySlug(slug)
	}


	@Post()
	public createAuto(
		@Body() dto: any
	): Promise<any> {
		return this.autoService.create(dto)
	}

	@Patch(':id')
	public updateAuto(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: any
	): Promise<any> {
		return this.autoService.update(id, dto)
	}

	@Delete(':id')
	public deleteAuto(
		@Param('id', IdValidationPipe) id: string
	): Promise<void> {
		return this.autoService.delete(id)
	}
}
