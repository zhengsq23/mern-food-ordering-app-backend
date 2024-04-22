import express, {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Connected to database!")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 新建express服务器
const app = express();

app.use(cors())

// 当收到路径为 /api/order/checkout/webhook 的请求时，Express 会使用 express.raw 中间件来解析请求体中的原始数据，并将其作为 req.body 提供给后续的中间件或路由处理函数
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

// 添加中间件，将api请求转为json
app.use(express.json())

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

// 服务器开启成功执行回调函数
app.listen(7001,()=>{
    console.log("server started on localhost:7001")
})