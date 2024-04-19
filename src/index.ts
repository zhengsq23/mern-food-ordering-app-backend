import express, {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";
import { v2 as cloudinary } from "cloudinary";

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
// 添加中间件，将api请求转为json
app.use(express.json())
app.use(cors())

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);

// 服务器开启成功执行回调函数
app.listen(7001,()=>{
    console.log("server started on localhost:7001")
})