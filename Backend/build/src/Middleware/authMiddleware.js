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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userAuthenticateMiddleware(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, '#gdey78');
            // Now TypeScript knows that 'decoded' is of type JwtPayload
            if (typeof decoded === 'string') {
                return res.status(401).json({ message: 'Invalid token format' });
            }
            req.userData = decoded;
            next(); // Call next here to pass control to the next middleware
        }
        catch (error) {
            res.status(401).json({ message: 'Authentication failed' });
        }
    });
}
exports.default = userAuthenticateMiddleware;
