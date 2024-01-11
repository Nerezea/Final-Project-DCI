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
  phone: String,
  image: String,
  // parent
  class: { type: Schema.Types.ObjectId, ref: "class" },
  birthDay: String,
  address: String,
  active: { type: Boolean, default: true },

  // teacher , parent
  school: { type: Schema.Types.ObjectId, ref: "school" },

  // teacher
  freeTeacher: Boolean,
});

userSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.password;
  return object;
};

export default model("user", userSchema);
