import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
	@prop()
	title: string;

	@prop()
	desc: string;

	@prop()
	brand: string;

	@prop()
	image: string;

	@prop()
	video: string;

	@prop()
	rating: number;

	@prop()
	price: number;

	@prop()
	oldPrice: number;

	@prop()
	countInStock: number;

	@prop()
	category: string;
}
