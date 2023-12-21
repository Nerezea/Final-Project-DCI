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
    type: {
      type: String,
      enum: ["text", "file"],
      default: "text",
    },
    pv: Boolean,
    receiver : {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  },
  { timestamps: true }
);

export default model("message", schema);


// school has value 
// class = no value 
// pv = false       =>>>>>>> forum school

// school has value 
// class  has value 
// pv = false       =>>>>>>> forum class

