import express from 'express';
import ItemController from '../Controllers/AdminControllers/ItemController';

const router = express.Router();

router.post('/add', ItemController.addItem);
router.get('/list', ItemController.listItems);

export default router;
