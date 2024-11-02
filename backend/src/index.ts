import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"

const uri = process.env.MONGODB_CONNECTION_STRING as string

console.log({ uri })

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log("Connection Successfull");
    })
    .catch((error) => {
        console.log("Connection Unsuccessfull, reason", error.message);
    });

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/my/user", myUserRoute);

app.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "hi no" })
})


app.listen(7000, () => {
    console.log("server started on localhost:7000")
})
