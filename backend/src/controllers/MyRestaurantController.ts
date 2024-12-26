import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary"
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.userId })
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" })
        }
        res.json(restaurant);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "error fetching restaurant" })
    }
}

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId })

        if (existingRestaurant) {
            return res.status(409).json({ message: "User already has a restaurant" })
        }

        const imageUrl = await uploadImage(req.file as Express.Multer.File)

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose.Types.ObjectId(req.userId)
        restaurant.lastUpdated = new Date()
        await restaurant.save()

        res.status(201).send(restaurant)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}

const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId })

        if (!existingRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        const restaurantBody = new Restaurant(req.body);

        existingRestaurant.restaurantName = restaurantBody.restaurantName
        existingRestaurant.city = restaurantBody.city
        existingRestaurant.country = restaurantBody.country
        existingRestaurant.deliveryPrice = restaurantBody.deliveryPrice
        existingRestaurant.estimatedDeliveryTime = restaurantBody.estimatedDeliveryTime
        existingRestaurant.cuisines = restaurantBody.cuisines
        existingRestaurant.menuItems = restaurantBody.menuItems
        existingRestaurant.lastUpdated = new Date();

        if (req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File)
            existingRestaurant.imageUrl = imageUrl
        }

        await existingRestaurant.save()
        res.status(200).send(existingRestaurant)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataURI = `data:${image.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
    return uploadResponse.url;
}

export default {
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant,
}