import { model, Schema } from "mongoose";

export const Roles = {
  PARENT: "parent",
  MANAGER: "manager",
  TEACHER: "teacher",
  SUPER_ADMIN: "superAdmin",
};

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6 },
  fullName: String,
  role: {
    type: String,
    enum: [Roles.MANAGER, Roles.PARENT, Roles.TEACHER, Roles.SUPER_ADMIN],
    default: Roles.PARENT,
  },
  profile: {
    type: Schema.Types.Mixed,
    // teacher 
    // school : String,
    
    // parent
    // school : String,
    // class : String,
  },
});

export default model("user", userSchema);
