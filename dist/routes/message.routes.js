"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controllers_1 = require("../controllers/message.controllers");
const protectRoutes_1 = __importDefault(require("../middleware/protectRoutes"));
const router = express_1.default.Router();
router.get('/:id', protectRoutes_1.default, message_controllers_1.getMessages);
router.post('/send/:id', protectRoutes_1.default, message_controllers_1.sendMessage);
exports.default = router;
