import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import { AutoService } from './auto.service';
import { CreateAutoDto } from './dto/create-auto.dto';
import { FiltersDto } from './dto/filters.dto';
import { UpdateAutoDto } from './dto/update-auto.dto';
import { Auto } from './schema/auto.schema';

@Controller('autos')
export class AutoController {
	constructor(private readonly autoService: AutoService) {}

	@Post()
	public getAutos(
		@Query('page') page?: number,
		@Query('limit') limit?: number,
		@Query('search') searchTerm?: string,
		@Query('sort') sort?: string,
		@Body() filters?: FiltersDto
	) {
		return this.autoService.getAll(page, limit, searchTerm, sort, filters)
	}


	@Get('by-brand/:brand')
	public getAutosByBrand(
		@Param('brand') brand: string
	): Promise<any[]> {
		return this.autoService.getByBrand(brand)
	}

	@Get('brands')
	public getAutoBrands(): Promise<string[]> {
		return this.autoService.getBrands()
	}

	@Get(':slug')
	public getAutoBySlug(
		@Param('slug') slug: string
	): Promise<any> {
		return this.autoService.getBySlug(slug)
	}


	@Post()
	public createAuto(
		@Body() dto: CreateAutoDto
	): Promise<Auto> {
		return this.autoService.create(dto)
	}

	@Patch(':id')
	public updateAuto(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: Partial<UpdateAutoDto>
	): Promise<Omit<Auto, '-__v' | '-createdAt' | '-updatedAt' | '-_id'>> {
		return this.autoService.update(id, dto)
	}

	@Delete(':id')
	public deleteAuto(
		@Param('id', IdValidationPipe) id: string
	): Promise<void> {
		return this.autoService.delete(id)
	}
}
