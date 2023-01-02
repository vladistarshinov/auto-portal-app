import asyncHandler from 'express-async-handler';
import ReviewService from '../services/review.service.js';

class ReviewController {

  // @desc     Create a new review
  // @route    POST /api/products/:id/reviews
  // @access   Private/Admin
  async createProductReview(req, res) {
      try {
        await ReviewService.create(req.user, req.params.id, req.body);
        res.status(201).json({ message: "Комментарий добавлен" });
      } catch (e) {
        res.status(500);
        throw new Error(e.message);
      }
      
  };

  // @desc     Delete review
  // @route    DELETE /api/products/:id/reviews/:id
  // @access   Private/User
  async deleteProductReview(req, res) {
      try {
        await ReviewService.delete(req.params.id1, req.params.id2);
        res.json({ message: 'Комментарий успешно удален' });
      } catch (e) {
        res.status(404);
        throw new Error(e.message);
      }
  };
};
export default new ReviewController();