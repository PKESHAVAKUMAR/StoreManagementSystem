"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authAdminCon_1 = __importDefault(require("../../Controllers/AdminControllers/authAdminCon"));
const authMiddleware_1 = __importDefault(require("../../Middleware/authMiddleware"));
const productCon_1 = __importDefault(require("../../Controllers/AdminControllers/productCon"));
const multer_1 = require("../../Multer/multer");
const routerAdmin = express_1.default.Router();
routerAdmin.post('/signup', [
    (0, express_validator_1.body)('username', 'Username is required').not().isEmpty(),
    (0, express_validator_1.body)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.body)('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], authAdminCon_1.default.registerAdmin);
routerAdmin.get('/', authMiddleware_1.default, authAdminCon_1.default.getAllAdmins);
routerAdmin.post('/login', [
    (0, express_validator_1.body)('username', 'Username is required').notEmpty(),
    (0, express_validator_1.body)('password', 'Password is required').notEmpty(),
], authAdminCon_1.default.loginAdmin);
//--------------------------------Products router----------------------------------------------------------------
routerAdmin.post('/Products', multer_1.upload.single('image'), productCon_1.default.createProduct);
// Get all Products
routerAdmin.get('/Products', productCon_1.default.getAllProducts);
// Get a specific Product by ID
routerAdmin.get('/Products/:id', productCon_1.default.getProductById);
// Update a Product by ID
routerAdmin.put('/Products/:id', multer_1.upload.single('image'), productCon_1.default.updateProduct);
// Delete a Product by ID
routerAdmin.delete('/Products/:id', productCon_1.default.deleteProduct);
routerAdmin.get('/Products_by_admin/:adminId', productCon_1.default.getProductsByAdminID);
routerAdmin.get('/Products/search/:query', productCon_1.default.searchProducts);
//--------------------------------end Products------------------------------------------------------------------------------
exports.default = routerAdmin;
