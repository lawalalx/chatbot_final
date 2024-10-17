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
const generateTokenAndGetToken = (userId, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if token already exists in cookies
    // const tokenFromCookie = req.cookies.jwt;
    // console.log("Token from request cookie", tokenFromCookie);
    // if (tokenFromCookie) {
    //   try {
    //     // Verify the existing token
    //     const decoded = await jwt.verify(tokenFromCookie, process.env.JWT_SECRET!);
    //     console.log("Decoded token", decoded);
    //     // If the token is valid, reuse it and don't generate a new one
    //     if (typeof decoded !== 'string' && decoded.userId) {
    //       console.log('Reusing existing token');
    //       console.log(req.cookies.jwt);
    //       // View user
    //       console.log(decoded.userId);
    //       return;
    //     }
    //   } catch (err) {
    //     console.log('Existing token is invalid or expired');
    //   }
    // }
    // Generate a new token if no valid one is found
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    console.log("Generated new token", token);
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    });
    return;
});
exports.default = generateTokenAndGetToken;
