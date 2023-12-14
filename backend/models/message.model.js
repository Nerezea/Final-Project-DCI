import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    text: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "class",
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "school",
      required: true,
    },
    pv: Boolean,
  },
  { timestamps: true }
);

export default model("message", schema);
