import asyncHandler from 'express-async-handler';
import Product from '../models/product.model';

const reviewController = {};

// @desc     Create a new review
// @route    POST /api/products/:id/reviews
// @access   Private/Admin
reviewController.createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Вы уже оценили данный товар");
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews
            .reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Комментарий добавлен" });

    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
    
});

// @desc     Delete review
// @route    DELETE /api/products/:id/reviews/:id
// @access   Private/Admin
reviewController.deleteProductReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id1);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r._id.toString() === req.params.id2.toString());
        console.log(product.reviews.indexOf(alreadyReviewed));

        if (alreadyReviewed) {
            product.reviews.splice(product.reviews.indexOf(alreadyReviewed), 1);
            console.log(product.reviews);
            product.numReviews = product.reviews.length;
            console.log(product.numReviews);
            if (product.reviews.length == 0) {
                product.rating = 0;
            } else {
                product.rating = product.reviews
                    .reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            }

            await product.save();
            console.log(product.reviews);
            res.json({ message: 'Комментарий успешно удален' });
        }

    } else {
        res.status(404);
        throw new Error("Комментарий не найден");
    }
});

export default reviewController;