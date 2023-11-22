// controllers/ItemController.ts
import { Request, Response } from 'express';
import Item, { IItem } from '../../Models/AdminModels/Item';

class ItemController {
  public addItem(req: Request, res: Response): void {
    const { name, description, price }: IItem = req.body;
    const item = new Item({ name, description, price });
    item.save();
    // item.save((err: { message: any }, savedItem: any) => {
    //   if (err) {
    //     res.status(500).json({ error: err.message });
    //   } else {
    //     res.status(201).json(savedItem);
    //   }
    // });
  }

  public listItems(req: Request, res: Response): void {
    Item.find({}, (err: { message: any }, items: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(items);
      }
    });
  }
}

export default new ItemController();
