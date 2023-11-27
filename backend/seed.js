import { hashPassword } from "./controller/hash.controller.js";
import schoolModel from "./models/school.model.js";
import userModel, { Roles } from "./models/user.model.js";

export async function seedFirstSchool() {
  const hashedPassword = await hashPassword("123456");
  const admin = await userModel.create({
    email: "admin@gmail.com",
    password: hashedPassword,
    fullName: "admin admini",
    role: Roles.ADMIN,
  });
  const school = await schoolModel.create({
    name: "Shahid Tomas muller",
    address: "some address",
    tel: "+5465985265",
    email: "school.tomas@gmail.com",
    admin: admin._id,
  });
}
