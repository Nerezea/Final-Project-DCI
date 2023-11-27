import { Schema, model } from "mongoose";

const schema = new Schema({
  title: String,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "class",
  },
});

export default model("feed", schema);
