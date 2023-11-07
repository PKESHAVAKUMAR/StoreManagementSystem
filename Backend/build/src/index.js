"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./Routes"));
class Server {
    constructor(app) {
        this.config(app);
        new Routes_1.default(app);
    }
    config(app) {
        // const corsOptions: CorsOptions = {
        //   origin: "http://localhost:8081"
        // };
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
    }
}
exports.default = Server;
