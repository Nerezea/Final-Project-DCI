import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import { seedFirstSchool } from "./seed.js";
//import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(express.json());
app.use("/api", router);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB with mongoose");
    //seedFirstSchool();
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.post("/createNote", async (req, res) => {
  try {
    const note = new Note(req.body);
    const response = await note.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(`Failed: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
