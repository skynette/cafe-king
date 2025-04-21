import express from "express"
import { param } from "express-validator"
import RestaurantController from "../controllers/RestaurantController"

const router = express.Router()

router.get(
    "/:restaurantId",
    param("restaurantId")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("restaurantId param must be a valid string"),
    RestaurantController.getRestaurant
)

// api/restaurant/search/benin
router.get(
    "/search/:city",
    param("city")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("city param must be a valid string"),
    RestaurantController.searchRestaurant
)

export default router