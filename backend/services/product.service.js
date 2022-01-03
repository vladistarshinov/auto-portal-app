import Product from '../models/product.model.js';

class ProductService {
	async getAll(query) {
		try {
      const pageSize = 8;
      const page = Number(query.pageNumber) || 1;
      const keyword = query.keyword ? {
        name: {
          $regex: query.keyword,
          $options: 'i'
        }
      } : {};

      const count = await Product.countDocuments({ ...keyword });
      const products = await Product
          .find({ ...keyword })
          .limit(pageSize)
          .skip(pageSize * (page - 1));
      return { products, page, pages: Math.ceil(count / pageSize) };
    } catch (error) {
      throw new Error('Ошибка при загрузке товаров');
    }
	}

	async getTop() {
		const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  	return products;
	}

	async getById(id) {
    const product = await Product.findById(id);

    try {
      if (product) {
        return product;
      } else {
        throw new Error('Товар не найден');
      }
    } catch (error) {
      throw new Error(`Товар с идентификатором ${id} не найден`);
    }

	}
}

export default new ProductService();