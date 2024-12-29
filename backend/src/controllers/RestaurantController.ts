import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const city = req.params.city

        const searchQuery = (req.query.searchQuery as string) || ""
        const selectedCuisines = req.query.selectedCuisines as string || ""
        const sortOption = req.query.sortOption as string || "lastUpdated"
        const page = req.query.page as string || 1

        let query: any = {}

        query['city'] = new RegExp(city, 'i')
        const cityCheck = await Restaurant.countDocuments(query)

        if (cityCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }
            })
        }

        if (selectedCuisines) {
            const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
            const cuisinesArray = selectedCuisines
                .split(",")
                .map((cuisine) => new RegExp(escapeRegex(cuisine), "i"));
        
            console.log({ cuisinesArray });
        
            query['cuisines'] = { $all: cuisinesArray };
        }

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i")
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } },
            ]
        }

        const pageSize = 10
        const skip = (parseInt(page as string) - 1) * pageSize
        const restaurants = await Restaurant.find(query)
            .sort({ [sortOption]: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean()

        console.log({ query })
        const total = await Restaurant.countDocuments(query)

        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize)
            }
        }

        return res.json(response)

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "something went wrong" })
    }
}


export default {
    searchRestaurant
}