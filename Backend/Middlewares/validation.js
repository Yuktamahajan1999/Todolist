// Middlewares/validation.js
import { body } from 'express-validator';

const ValidationMiddleware = [
    body('name')
        .notEmpty().withMessage("User name must not be empty")
        .isLength({ min: 3, max: 15 }).withMessage("Name should be 3-15 characters long"),

    body('email')
        .notEmpty().withMessage("Email must not be empty")
        .isEmail().withMessage("Email is not valid"),

    body('password')
        .notEmpty().withMessage("Password must not be empty")
        .isStrongPassword().withMessage("Password must include at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol"),
];

export default ValidationMiddleware;
