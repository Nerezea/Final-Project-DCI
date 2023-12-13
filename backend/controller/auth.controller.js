import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";
import classModel from "../models/class.model.js";
import userModel from "../models/user.model.js";

export async function login(req, res) {
  const { email, password } = req.body;
  //  active !== false
  const user = await UserModel.findOne({ email, active: { $ne: false } });

  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.send({ token, role: user.role, fullName: user.fullName });
}

export async function register(req, res) {
  const { email, password, class: classId } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(400).send({ message: "email already exists" });
  }
  const classData = await classModel.findById(classId);
  const hash = await hashPassword(password);

  // oder : UserModel.create(body)
  await UserModel.create({
    ...req.body,
    password: hash,
    school: classData.school,
    active: false,
  });
  res.send({ message: "User created" });
}

//test
