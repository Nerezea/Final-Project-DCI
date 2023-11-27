import schoolModel from "../models/school.model.js";
import userModel, { Roles } from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";

// manager requests list of teachers
export const getTeachers = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });
  // find list of users where role is teacher and her/his school is above school
  const teachers = await userModel.find({
    role: Roles.TEACHER,
    "profile.school": school._id,
  });
  res.send(teachers);
};

export const createTeacher = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });
  const body = req.body;
  // hash password 
  const hashedPassword = await hashPassword(body.password);
  // create teacher
  const user = await userModel.create({
    email: body.email,
    password: hashedPassword,
    fullName: body.fullName,
    role: Roles.TEACHER,
    profile: { school: school._id },
  });
  res.send(user);
};
