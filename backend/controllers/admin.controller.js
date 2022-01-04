import asyncHandler from 'express-async-handler';
import AdminService from '../services/admin.service.js';

const adminController = {};

// @desc     Get all users
// @route    GET /api/admin/users
// @access   Private/Admin
adminController.getUsers = asyncHandler(async (req, res) => {
    const users = await AdminService.getUsers();
    res.json(users);
});

// @desc     Get users by id
// @route    GET /api/admin/users/:id
// @access   Private/Admin
adminController.getUserById = asyncHandler(async (req, res) => {
    const user = await AdminService.getUserById(req.params.id);
    res.json(user);
});

// @desc     Update user
// @route    PUT /api/admin/users/:id
// @access   Private/Admin
adminController.updateUser = asyncHandler(async (req, res) => {
    try {
        const updatedUser = await AdminService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (e) {
        res.status(404);
        throw new Error(e.message);
    }
});

// @desc     Delete user
// @route    DELETE /api/admin/users/:id
// @access   Private/Admin
adminController.deleteUser = asyncHandler(async (req, res) => {
    try {
      await AdminService.deleteUser(req.params.id);
      res.json({ message: "Пользователь успешно удален" });
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }
});

// @desc     Create a product
// @route    POST /api/admin/products
// @access   Private/Admin
adminController.createProduct = asyncHandler(async (req, res) => {
    const { name, 
            description, 
            image, 
            price, 
            countInStock, 
            brand, 
            category } = req.body;

    const existProduct = await Product.findOne({ name });

    if (existProduct) {
        res.status(400);
        throw new Error("Товар с таким названием уже существует");
    } 

    const product = new Product({
        user: req.user._id,
        name, 
        description, 
        image, 
        price, 
        countInStock, 
        brand, 
        category,
        numReviews: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
    
});

// @desc     Update product
// @route    PUT /api/admin/products/:id
// @access   Private/Admin
adminController.updateProduct = asyncHandler(async (req, res) => {
    const { name, 
            description, 
            image, 
            price, 
            countInStock, 
            brand, 
            category } = req.body;

    const existProduct = await Product.findOne({ name });

    if (existProduct) {
        res.status(400);
        throw new Error("Товар с таким названием уже существует");
    } 

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.description = description;
        product.image = image;
        product.price = price;
        product.countInStock = countInStock;
        product.brand = brand;
        product.category = category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
    
});


// @desc     Delete product
// @route    DELETE /api/admin/products/:id
// @access   Private/Admin
adminController.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Товар успешно удален' });
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
});

// @desc     Get all orders
// @route    GET /api/admin/orders
// @access   Private/Admin
adminController.getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});


export default adminController;