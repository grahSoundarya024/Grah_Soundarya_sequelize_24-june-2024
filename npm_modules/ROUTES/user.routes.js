import express from "express";
import {signUp , signIn} from '../CONTROLLER/user.controller.js'
// import {body} from 'express-validator';
const router = express.Router();
router.post("/signUp",
// body("name","Name is required..").notEmpty(), 
// body("name","is required..").isAlpha(),
// body("username","Username is required").notEmpty(),
// body("username" ,"Invalid Email Id").isEmail(),
// body("password","Password is required").notEmpty(),

// body("password","Password must be longer than 6 characters.").isLength({min :6}),
// body("contact_no","Contact number must be 10 Digit").isLength({min:10}),
// body("contact_no","Contact no is numeric...").isNumeric(), 
signUp);
router.post("/signIn",signIn)
export default router;
