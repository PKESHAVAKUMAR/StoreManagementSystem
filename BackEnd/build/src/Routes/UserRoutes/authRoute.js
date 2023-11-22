"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = __importDefault(require("../../Controllers/UserControllers/authController"));
const router = express_1.default.Router();
router.post('/signup', [
    (0, express_validator_1.body)('username', 'Username is required').not().isEmpty(),
    (0, express_validator_1.body)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.body)('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], authController_1.default.registerUser);
router.get('/', authController_1.default.getAllUsers);
router.post('/login', [
    (0, express_validator_1.body)('username', 'Username is required').notEmpty(),
    (0, express_validator_1.body)('password', 'Password is required').notEmpty(),
], authController_1.default.loginUser);
router.put('/:id', authController_1.default.updateUser);
router.delete('/:id', authController_1.default.deleteUser);
router.get('/:id', authController_1.default.getUserByID);
exports.default = router;
