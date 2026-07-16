import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = process.env.PORT || 6000
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(cookieParser())
app.use(express.static("public"))


app.get('/', (req, res) => {
    res.status(200).json({success: true, message: "server is running!"})
})


app.listen(port, ()=>{
    console.log("server is running on port " + port)
})