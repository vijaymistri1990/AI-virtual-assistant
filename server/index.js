import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import assistantRouter from "./routes/assistant.route.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
const privateCors = cors({
  origin: ["http://localhost:5174", "http://localhost:5173"],
  credentials: true,
});

const publicCors = cors({
  origin: true,
  credentials: true,
});
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1/auth", privateCors, authRouter);
app.use("/api/v1/user", privateCors, userRouter);
app.use("/api/v1/assistant", publicCors, assistantRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "server is running!" });
});

connectDB()
  .then(
    app.listen(process.env.PORT || 6000, () => {
      console.log(`App is Listning on port ${process.env.PORT || 6000}`);
    }),
  )
  .catch((error) => {
    console.log("MongDB Connection Failed", error);
  });
