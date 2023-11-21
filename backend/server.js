import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB with mongoose");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
