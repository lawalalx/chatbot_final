"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const protectRoutes_1 = __importDefault(require("../middleware/protectRoutes"));
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const router = express_1.default.Router();
router.get('/', protectRoutes_1.default, user_controllers_1.getUsersForSidebar);
exports.default = router;
