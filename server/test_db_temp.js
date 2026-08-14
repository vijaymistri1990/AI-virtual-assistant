import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";

dotenv.config();

console.log("Connecting to:", process.env.DATABASE_URI);
mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });
