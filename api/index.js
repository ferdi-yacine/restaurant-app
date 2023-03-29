import express from "express";
import mongoose from "mongoose";
import productRoute from "./routers/product.js";
import orderRoute from "./routers/order.js";
import loginRoute from "./routers/login.js"
import cors from "cors";
import dotenv from "dotenv"

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect to DB successfully");
    } catch(err) {
        throw err
    }
}

const corsOptions = {
    origin: "YOUR_CLIENT_URL",
    credentials: true,
}

dotenv.config()
const app = express();
app.use(cors(corsOptions))
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/login", loginRoute);


app.listen(process.env.PORT || 5000, () => {
    connect();
    console.log("Server is running!!!")
})