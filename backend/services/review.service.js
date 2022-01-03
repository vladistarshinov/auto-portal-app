import Product from '../models/product.model.js';

class ReviewService {
	async create(user, productId, reviewData) {
		const { rating, comment } = reviewData;

    const product = await Product.findById(productId);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === user._id.toString());

        if (alreadyReviewed) {
            //res.status(400);
            throw new Error("Вы уже оценили данный товар");
        }

        const review = {
            name: user.name,
            rating: Number(rating),
            comment,
            user: user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews
            .reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        return;

    } else {
        //res.status(404);
        throw new Error("Товар не найден");
    }
	}

	async delete(productId, reviewId) {
    const product = await Product.findById(productId);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r._id.toString() === reviewId.toString());
        console.log(product.reviews.indexOf(alreadyReviewed));

        if (alreadyReviewed) {
            product.reviews.splice(product.reviews.indexOf(alreadyReviewed), 1);
            //console.log(product.reviews);
            product.numReviews = product.reviews.length;
            //console.log(product.numReviews);
            if (product.reviews.length == 0) {
                product.rating = 0;
            } else {
                product.rating = product.reviews
                    .reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            }

            await product.save();
						return;
            //console.log(product.reviews);
            //res.json({ message: 'Комментарий успешно удален' });
        }

    } else {
        //res.status(404);
        throw new Error("Комментарий не найден");
    }
	}
}

export default new ReviewService();