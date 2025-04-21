import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"
import myRestaurantRoute from "./routes/MyRestaurantRoutes"
import restaurantRoute from "./routes/RestaurantRoutes"
import orderRoute from "./routes/OrderRoutes"
import { v2 as cloudinary } from "cloudinary"

const uri = process.env.MONGODB_CONNECTION_STRING as string

console.log({ uri })

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((error) => {
        console.log("Connection Unsuccessful, reason", error.message);
    });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const app = express()
app.use(express.json())
app.use(cors())

app.get("/health", async (req: Request, res: Response) => {
    res.json({ message: "health ok!" })
})

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute)

app.listen(7000, () => {
    console.log("server started on localhost:7000")
})
