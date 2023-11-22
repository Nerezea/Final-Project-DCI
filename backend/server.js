import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Note from "./notes.js";

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
