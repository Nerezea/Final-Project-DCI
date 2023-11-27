import { Schema, model } from "mongoose";

const classSchema = new Schema({
  name: String,
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
});

export default model("class", classSchema);
