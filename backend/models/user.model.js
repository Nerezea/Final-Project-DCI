import { model, Schema } from "mongoose";

const userSchema = new Schema({
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, unique: true, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "lehrer"],
    default: "user",
  },
});

export default model("user", userSchema);
