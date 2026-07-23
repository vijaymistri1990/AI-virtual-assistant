import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import connectDB from "./db/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.route.js"

dotenv.config()

const app = express();

app.use(express.json({limit: "32kb" }))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.static("public"))

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)


app.get('/', (req, res) => {
    res.status(200).json({success: true, message: "server is running!"})
})


connectDB()
.then(app.listen(process.env.PORT||6000, ()=>{
    console.log(`App is Listning on port ${process.env.PORT || 6000}`)
}))
.catch((error)=>{
    console.log('MongDB Connection Failed',error)
})