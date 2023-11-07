"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import authRoute from "./authRoute";
// import userRoutes from "./user.routes";
const authRoute_1 = __importDefault(require("./UserRoutes/authRoute"));
const authAdminRou_1 = __importDefault(require("./AdminRoutes/authAdminRou"));
class Routes {
    constructor(app) {
        app.use("/users", authRoute_1.default);
        app.use("/instructors", authAdminRou_1.default);
    }
}
exports.default = Routes;
