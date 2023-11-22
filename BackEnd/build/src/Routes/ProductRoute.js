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
Object.defineProperty(exports, "__esModule", { value: true });
// routes/product.ts
const express_1 = require("express");
const Product_1 = require("../Models/Product");
const router = (0, express_1.Router)();
// Create a new product
router.post('/Product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new Product_1.Product(req.body);
        const savedProduct = yield product.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(500).json({ error: 'Error saving product' });
    }
}));
// Get a list of all products
router.get('/Product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
}));
// Add routes for updating and deleting products if needed
exports.default = router;
