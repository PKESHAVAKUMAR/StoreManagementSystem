import Product from "../../Models/AdminModels/ProductModel";
import { Request, Response } from 'express';
import fs from 'fs';
// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;
// Create a new Product
class ProductController {
    
    static async createProduct(req: Request, res: Response) {
        try {
            const { Admin_id, title, description } = req.body;

            // Check if req.file is defined
            if (req.file) {
                const image = req.file.filename; // Get the uploaded image filename

                const product = new Product({
                    Admin_id,
                    title,
                    description,
                    image,
                });

                const savedProduct = await product.save();
                res.status(201).json(savedProduct);
            } else {
                res.status(400).json({ error: 'No file uploaded.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Could not create the Product.' });
        }
    }



    // Get all Products
    static async getAllProducts(req: Request, res: Response) {
        try {
            const Products = await Product.find().populate('Admin_id'); // Use populate to include Admin details
            res.json(Products);
        } catch (error) {
            res.status(500).json({ error: 'Could not fetch Products.' });
        }
    };

    // Get a specific Product by ID
    static async getProductById(req: Request, res: Response) {
        try {
            const ProductId = req.params.id;
            const product = await Product.findById(ProductId).populate('Admin_id'); // Use populate to include Admin details
            if (!Product) {
                return res.status(404).json({ error: 'Product not found.' });
            }
            res.json(Product);
        } catch (error) {
            res.status(500).json({ error: 'Could not fetch the Product.' });
        }
    };

    // Update a Product by ID
    static async updateProduct(req: Request, res: Response) {
        try {
          let ProductId = req.params.id;
          console.log("ProductID", ProductId);
      
          if (req.file) {
            // The image file will be available in req.file
            const updatedProduct = {
              ...req.body,
              img_url: req.file.filename, // Assuming you save the filename in the database
            };
      
            let product = await Product.findOneAndUpdate({ _id: ProductId }, updatedProduct, { new: true });
      
            if (!Product) {
              return res.status(404).send('No Product found');
            }
      
            res.send(updatedProduct);
          } else {
            let updatedProduct = { ...req.body };
            let product = await Product.findOneAndUpdate({ _id: ProductId }, updatedProduct, { new: true });
      
            if (!Product) {
              return res.status(404).send('No Product found');
            }
      
            res.send(updatedProduct);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }
    


    // Delete a Product by ID
    static async deleteProduct(req: Request, res: Response) {
        try {
            const ProductId = req.params.id;
            const deletedProduct = await Product.findByIdAndRemove(ProductId);
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found.' });
            }
            res.json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Could not delete the Product.' });
        }
    };

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
    static async getProductsByAdminID(req: Request, res: Response) {
        try {
            const adminId = req.params.adminId; // Change this line
            const Products = await Product.find({ Admin_id: adminId });
            res.json(Products);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Search for Products based on a search query
    
    static async searchProducts(req: Request, res: Response) {
        try {
            const query = req.params.query;

            // Use a regular expression to perform a case-insensitive search
            const regex = new RegExp(query, 'i');

            const Products = await Product.find({
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } },
                ],
            }).populate('Admin_id');

            res.json(Products);
        } catch (error) {
            res.status(500).json({ error: 'Could not perform the search.' });
        }
    }




}
export default ProductController;
