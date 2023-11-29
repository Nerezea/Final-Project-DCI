import schoolModel from "../models/school.model.js";
import userModel, { Roles } from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";

// manager requests list of teachers
export const getStudents = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });

  const classId = req.query.class;
  // find list of users where role is teacher and her/his school is above school
  const query = {
    role: Roles.PARENT,
    "profile.school": school._id,
    // "profile.class": school._id,
  };
  if (classId) query["profile.class"] = classId;

  const teachers = await userModel.find(query);
  res.send(teachers);
};

export const createStudent = async (req, res) => {
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
    role: Roles.PARENT,
    profile: { school: school._id, class: body.class },
  });
  res.send(user);
};

export const deleteStudent = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });

  const { studentId } = req.params;
  const user = await userModel.findOneAndDelete({
    _id: studentId,
    "profile.school": school._id,
  });
  if (!user) return res.status(400).send({ message: "student not found" });

  res.sendStatus(200);
};

export const updateTeacher = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });
  const body = req.body;

  if (body.password) body.password = await hashPassword(body.password);

  const { studentId } = req.params;

  const user = await userModel.findOneAndUpdate(
    {
      _id: studentId,
      "profile.school": school._id,
    },
    { $set: body }
  );
  if (!user) return res.status(400).send({ message: "student not found" });

  res.sendStatus(200);
};
