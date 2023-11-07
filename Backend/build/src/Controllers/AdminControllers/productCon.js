"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../../Models/AdminModels/ProductModel"));
// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;
// Create a new Product
class ProductController {
    // static async createProduct(req: Request, res: Response) {
    //     try {
    //         const { Admin_id, title, description, image } = req.body;
    //         const file = req.files as Express.Multer.File[];
    //         const image = req.file.filename;
    //         const Product = new Product({
    //             Admin_id,
    //             title,
    //             description,
    //             image,
    //         });
    //         const savedProduct = await Product.save();
    //         res.status(201).json(savedProduct);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Could not create the Product.' });
    //     }
    // };
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Admin_id, title, description } = req.body;
                // Check if req.file is defined
                if (req.file) {
                    const image = req.file.filename; // Get the uploaded image filename
                    const product = new ProductModel_1.default({
                        Admin_id,
                        title,
                        description,
                        image,
                    });
                    const savedProduct = yield product.save();
                    res.status(201).json(savedProduct);
                }
                else {
                    res.status(400).json({ error: 'No file uploaded.' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Could not create the Product.' });
            }
        });
    }
    // Get all Products
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Products = yield ProductModel_1.default.find().populate('Admin_id'); // Use populate to include Admin details
                res.json(Products);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not fetch Products.' });
            }
        });
    }
    ;
    // Get a specific Product by ID
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ProductId = req.params.id;
                const product = yield ProductModel_1.default.findById(ProductId).populate('Admin_id'); // Use populate to include Admin details
                if (!ProductModel_1.default) {
                    return res.status(404).json({ error: 'Product not found.' });
                }
                res.json(ProductModel_1.default);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not fetch the Product.' });
            }
        });
    }
    ;
    // Update a Product by ID
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ProductId = req.params.id;
                console.log("ProductID", ProductId);
                if (req.file) {
                    // The image file will be available in req.file
                    const updatedProduct = Object.assign(Object.assign({}, req.body), { img_url: req.file.filename });
                    let product = yield ProductModel_1.default.findOneAndUpdate({ _id: ProductId }, updatedProduct, { new: true });
                    if (!ProductModel_1.default) {
                        return res.status(404).send('No Product found');
                    }
                    res.send(updatedProduct);
                }
                else {
                    let updatedProduct = Object.assign({}, req.body);
                    let product = yield ProductModel_1.default.findOneAndUpdate({ _id: ProductId }, updatedProduct, { new: true });
                    if (!ProductModel_1.default) {
                        return res.status(404).send('No Product found');
                    }
                    res.send(updatedProduct);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    // Delete a Product by ID
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ProductId = req.params.id;
                const deletedProduct = yield ProductModel_1.default.findByIdAndRemove(ProductId);
                if (!deletedProduct) {
                    return res.status(404).json({ error: 'Product not found.' });
                }
                res.json(deletedProduct);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not delete the Product.' });
            }
        });
    }
    ;
    // static async getAdminProductsById(req: Request, res: Response) {
    //     try {
    //         const adminId = req.params.adminId;
    //         const Products = await Product.find({ 'Admin_id._id': adminId });
    //         res.json(Products);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // };
    // get Products by particular admin id
    static getProductsByAdminID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminId = req.params.adminId; // Change this line
                const Products = yield ProductModel_1.default.find({ Admin_id: adminId });
                res.json(Products);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    // Search for Products based on a search query
    static searchProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.params.query;
                // Use a regular expression to perform a case-insensitive search
                const regex = new RegExp(query, 'i');
                const Products = yield ProductModel_1.default.find({
                    $or: [
                        { title: { $regex: regex } },
                        { description: { $regex: regex } },
                    ],
                }).populate('Admin_id');
                res.json(Products);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not perform the search.' });
            }
        });
    }
}
exports.default = ProductController;
