import { hashPassword } from "./controller/hash.controller.js";
import schoolModel from "./models/school.model.js";
import userModel, { Roles } from "./models/user.model.js";
import classModel from "./models/class.model.js";

export async function seedFirstSchool() {
  const hashedPassword = await hashPassword("123456");
  const admin = await userModel.create({
    email: "admin@gmail.com",
    password: hashedPassword,
    fullName: "admin admini",
    role: Roles.MANAGER,
  });
  const school = await schoolModel.create({
    name: "Shahid mam merkel",
    address: "some address",
    tel: "+5465985265",
    email: "school.merkel@gmail.com",
    admin: admin._id,
  });
}

export async function seedClass() {
  const school = "6561b766e86ef4b81604cc8d";
  const teacher = "6561c13953dd4bcf2bcd0042";
  await classModel.create({ name: "Class A", school, teacher });
}
