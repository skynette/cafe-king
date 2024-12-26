import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("city must be a string"),
    body("country").isString().notEmpty().withMessage("country must be a string"),
    handleValidationErrors,
]

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("restaurant name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("deliveryPrice").isFloat({min: 0}).withMessage("deliveryPrice must be a positive integer"),
    body("estimatedDeliveryTime").isInt({min: 0}).withMessage("estimatedDeliveryTime must be a positive integer"),
    body("cuisines").isArray().withMessage("cusines must be an array").not().isEmpty().withMessage("array cannot be empty"),
    body("menuItems").isArray().withMessage("menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("menu item name is required"),
    body("menuItems.*.price").isFloat({min: 0}).withMessage("menu item price must be positive integer"),
    handleValidationErrors,
]