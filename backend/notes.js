import { Schema, model } from "mongoose";

const notesSchema = new Schema({
  testnote: { type: String, required: true, unique: true },
  testnote2: { type: String, required: true },
});

const Note = new model("notes", notesSchema);

export default Note;
