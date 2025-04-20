import {body} from 'express-validator';

export const createUserValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid Email formate'),
    body('phone').isMobilePhone().withMessage('Invalid Phone number'),
    body('name').notEmpty().withMessage('Name is required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid Gender'),
    body('birthdate').isDate().withMessage('Invalid Birthdate'),
    body('role').isIn(['user', 'admin']).withMessage('Invalid role'),
];




