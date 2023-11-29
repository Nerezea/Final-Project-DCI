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

export const deleteTeacher = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  console.log(userId);
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });

  const { teacherId } = req.params;
  const user = await userModel.findOneAndDelete({
    _id: teacherId,
    "profile.school": school._id,
  });
  if (!user) return res.status(400).send({ message: "teacher not found" });

  res.sendStatus(200);
};

export const updateTeacher = async (req, res) => {

  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });
  const body = req.body;

  if(body.password)
    body.password = await hashPassword(body.password)
  
  const { teacherId } = req.params;

  const user = await userModel.findOneAndUpdate(
    {
      _id: teacherId,
      "profile.school": school._id,
    },
    { $set: body }
  );
  if (!user) return res.status(400).send({ message: "teacher not found" });

  res.sendStatus(200);
};
