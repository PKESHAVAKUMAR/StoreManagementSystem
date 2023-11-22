"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../Models/UserModels/UserModel"));
const JWT_SECRET = 'olleh nihtij';
class UserController {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { username, email, password } = req.body;
            try {
                let user = yield UserModel_1.default.findOne({ email });
                if (user) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                user = new UserModel_1.default({
                    username,
                    email,
                    password: hashedPassword,
                });
                yield user.save();
                const payload = {
                    user: {
                        id: user.id,
                    },
                };
                jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err)
                        throw err;
                    res.json({ token });
                });
            }
            catch (error) {
                // console.error(error.message);
                res.status(500).send('Server error');
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel_1.default.find();
                res.json(users);
            }
            catch (error) {
                // console.error(error.message);
                res.status(500).send('Server error');
            }
        });
    }
    //Delete the user
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                let user = yield UserModel_1.default.findByIdAndRemove(userId);
                if (!user) {
                    res.json({ message: "No such user" });
                }
                res.json({ message: "Deleted Successfully" });
            }
            catch (err) {
                res.status(500).json({ message: 'Invalid user' });
            }
        });
    }
    ;
    //update the user
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const updates = Object.assign({}, req.body);
            try {
                let user = yield UserModel_1.default.findOneAndUpdate({ _id: userId }, updates, { new: true });
                if (!user) {
                    throw Error("User Not Found");
                }
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(400).json({ msg: 'Error updating user', err });
            }
        });
    }
    //get by id
    static getUserByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                let user = yield UserModel_1.default.findById(userId);
                if (!user) {
                    throw Error("User not found");
                }
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(400).json({ msg: 'Error getting user', err });
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                // Find the user by username
                const user = yield UserModel_1.default.findOne({ username });
                if (!user) {
                    return res.status(400).json({ message: 'Invalid username or password' });
                }
                // Check if the provided password matches the stored hashed password
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(400).json({ message: 'Invalid username or password' });
                }
                // Create a JSON Web Token (JWT) for the user
                const payload = {
                    user: {
                        id: user.id,
                    },
                };
                jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err)
                        throw err;
                    res.json({ token });
                });
            }
            catch (error) {
                // console.error(error.message);
                res.status(500).send('Server error');
            }
        });
    }
}
exports.default = UserController;
