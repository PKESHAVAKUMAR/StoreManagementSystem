// routes/product.ts
import { Router } from 'express';
import { Product } from '../Models/Product';
import { IProduct } from '../Models/Product';


const router = Router();

// Create a new product
router.post('/Product', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error saving product' });
  }
});

// Get a list of all products
router.get('/Product', async (req, res) => {
  try {
    const products: IProduct[] = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Add routes for updating and deleting products if needed

export default router;
