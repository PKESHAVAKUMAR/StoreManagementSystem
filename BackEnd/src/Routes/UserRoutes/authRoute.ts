import express from 'express';
import { body } from 'express-validator';
import UserController from '../../Controllers/UserControllers/authController';
import authMiddleware from '../../Middleware/authMiddleware';
const router = express.Router();

router.post(
  '/signup',
  [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  UserController.registerUser
);
router.get('/',UserController.getAllUsers);
router.post(
    '/login',
    [
      body('username', 'Username is required').notEmpty(),
      body('password', 'Password is required').notEmpty(),
    ],
    UserController.loginUser
  );
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/:id',UserController.getUserByID);

export default router;
