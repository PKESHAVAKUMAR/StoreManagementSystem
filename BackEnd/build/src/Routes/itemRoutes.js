"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ItemController_1 = __importDefault(require("../Controllers/AdminControllers/ItemController"));
const router = express_1.default.Router();
router.post('/add', ItemController_1.default.addItem);
router.get('/list', ItemController_1.default.listItems);
exports.default = router;
