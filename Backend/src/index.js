import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";

const PORT= process.env.NODE_PORT;

const app =express()
app.use(cookieParser());
app.use(express.json())

app.use(cors({
    origin: 
        'http://localhost:5173',  // Add your Vite/Vue/React dev server
        exposedHeaders: ['set-cookie'],
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.listen(PORT,()=>{
    console.log("port is running "+PORT)
    connectDB();
})

