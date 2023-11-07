import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../Models/UserModels/UserModel';

const JWT_SECRET = 'olleh nihtij';

class UserController {
  static async registerUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }
  // Update the User 
  // static async updateUser(req: Request, res: Response) {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   const { username, email, password } = req.body;
  //   const userId = req.params.id; // Assuming you're passing the user's id as a URL parameter

  //   try {
  //     let user = await User.findById(userId);

  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }

  //     // If you want to update username and email, you can do so like this:
  //     if (username) user.username = username;
  //     if (email) user.email = email;

  //     // If you want to update the password, you should hash it again and update it:
  //     if (password) {
  //       const saltRounds = 10;
  //       const hashedPassword = await bcrypt.hash(password, saltRounds);
  //       user.password = hashedPassword;
  //     }

  //     // Save the updated user to the database
  //     await user.save();

  //     // You can generate a new token or simply respond with a success message
  //     // depending on your application's needs

  //     res.json({ message: 'User updated successfully' });
  //   } catch (error) {
  //     // Handle errors
  //     // console.error(error.message);
  //     res.status(500).send('Server error');
  //   }
  // }
  //Delete the user
  static async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      let user = await User.findByIdAndRemove(userId);
      if (!user) {
        res.json({ message: "No such user" });
      }
      res.json({ message: "Deleted Successfully" });
    } catch (err) {
      res.status(500).json({ message: 'Invalid user' });
    }
  };

  //update the user
  static async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const updates = { ...req.body };
    try {
      let user = await User.findOneAndUpdate({ _id: userId }, updates, { new: true });
      if (!user) {
        throw Error("User Not Found");
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ msg: 'Error updating user', err })
    }
  }
  //get by id
  static async getUserByID(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      let user = await User.findById(userId);
      if (!user) {
        throw Error("User not found");
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ msg: 'Error getting user', err })
    }
  }




  static async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Create a JSON Web Token (JWT) for the user
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }
}

export default UserController;

