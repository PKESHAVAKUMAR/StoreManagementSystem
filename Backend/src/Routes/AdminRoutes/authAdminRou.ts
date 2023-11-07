
import express from 'express';
import { body } from 'express-validator';
import AdminController from '../../Controllers/AdminControllers/authAdminCon';
import authMiddleware from '../../Middleware/authMiddleware';
import ProductController from '../../Controllers/AdminControllers/productCon';
import { upload } from '../../Multer/multer';
import { Request, Response } from 'express';
import Product from "../../Models/AdminModels/ProductModel";
const routerAdmin = express.Router();

routerAdmin.post(
  '/signup',
  [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  AdminController.registerAdmin
);
routerAdmin.get('/',authMiddleware,AdminController.getAllAdmins);


routerAdmin.post(
    '/login',
    [
      body('username', 'Username is required').notEmpty(),
      body('password', 'Password is required').notEmpty(),
    ],
    AdminController.loginAdmin
  );

//--------------------------------Products router----------------------------------------------------------------
routerAdmin.post('/Products', upload.single('image'), ProductController.createProduct);
// Get all Products
routerAdmin.get('/Products', ProductController.getAllProducts);

// Get a specific Product by ID
routerAdmin.get('/Products/:id', ProductController.getProductById);

// Update a Product by ID
routerAdmin.put('/Products/:id', upload.single('image'),ProductController.updateProduct);

// Delete a Product by ID
routerAdmin.delete('/Products/:id', ProductController.deleteProduct);

routerAdmin.get('/Products_by_admin/:adminId', ProductController.getProductsByAdminID);

routerAdmin.get('/Products/search/:query', ProductController.searchProducts);
//--------------------------------end Products------------------------------------------------------------------------------
export default routerAdmin;
