import { Schema, model } from "mongoose";

const schema = new Schema({
  start: { type: Date, required: true },
  end: Date,
  // end date is optional
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
  hasConsent: Boolean,
});

export default model("event", schema);
