import asyncHandler from 'express-async-handler';
import Product from '../models/product.model';

const reviewController = {};

// @desc     Create a new review
// @route    POST /api/products/:id/reviews
// @access   Private/Admin
reviewController.createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    console.log(product);

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

export default reviewController;