"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../../Models/AdminModels/Item"));
class ItemController {
    addItem(req, res) {
        const { name, description, price } = req.body;
        const item = new Item_1.default({ name, description, price });
        item.save();
        // item.save((err: { message: any }, savedItem: any) => {
        //   if (err) {
        //     res.status(500).json({ error: err.message });
        //   } else {
        //     res.status(201).json(savedItem);
        //   }
        // });
    }
    listItems(req, res) {
        Item_1.default.find({}, (err, items) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
            else {
                res.status(200).json(items);
            }
        });
    }
}
exports.default = new ItemController();
