import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
	constructor(private readonly _productService: ProductService) {}

	/**
	 * @desc Gel all products
	 * @route GET /api/products
	 * @access Public
	 */
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this._productService.getAll(searchTerm);
	}
}
