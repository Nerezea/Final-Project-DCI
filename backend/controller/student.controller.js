<<<<<<< HEAD
import mongoose, { Schema } from "mongoose";
import userModel, { Roles } from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";
import { getSchoolOfManagerById } from "./utils.controller.js";

// manager requests list of teachers
export const getStudents = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);
=======
import schoolModel from "../models/school.model.js";
import userModel, { Roles } from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";

// manager requests list of teachers
export const getStudents = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });
>>>>>>> dev

  const classId = req.query.class;
  // find list of users where role is teacher and her/his school is above school
  const query = {
    role: Roles.PARENT,
<<<<<<< HEAD
    school: school._id,
    // "profile.class": school._id,
  };
  if (classId) query.class = classId;

  const students = await userModel.find(query).populate("class");
  res.send(students);
};

export const getStudentById = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const students = await userModel.findOne({
    role: Roles.PARENT,
    school: school._id,
    _id: req.params.id,
  });
  res.send(students);
};

export const createStudent = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);
=======
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
>>>>>>> dev

  const body = req.body;
  // hash password
  const hashedPassword = await hashPassword(body.password);
  // create teacher
  const user = await userModel.create({
<<<<<<< HEAD
    // email: body.email,
    // fullName: body.fullName,
    // phone: body.phone,
    // class:body.class,
    // birthDay: body.birthDay,
    // address: body.address,
    ...body, // equals to above commented codes
    password: hashedPassword,
    role: Roles.PARENT,
    school: school._id,
=======
    email: body.email,
    password: hashedPassword,
    fullName: body.fullName,
    role: Roles.PARENT,
    profile: { school: school._id, class: body.class },
>>>>>>> dev
  });
  res.send(user);
};

export const deleteStudent = async (req, res) => {
<<<<<<< HEAD
  const school = await getSchoolOfManagerById(req.user.id);
=======
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });
>>>>>>> dev

  const { studentId } = req.params;
  const user = await userModel.findOneAndDelete({
    _id: studentId,
<<<<<<< HEAD
    school: school._id,
=======
    "profile.school": school._id,
>>>>>>> dev
  });
  if (!user) return res.status(400).send({ message: "student not found" });

  res.sendStatus(200);
};

<<<<<<< HEAD
export const updateStudent = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

=======
export const updateTeacher = async (req, res) => {
  // id of manager
  const userId = req.user.id;
  // find school of manager
  const school = await schoolModel.findOne({ admin: userId });
>>>>>>> dev
  const body = req.body;

  if (body.password) body.password = await hashPassword(body.password);

  const { studentId } = req.params;

  const user = await userModel.findOneAndUpdate(
    {
      _id: studentId,
<<<<<<< HEAD
      school: school._id,
=======
      "profile.school": school._id,
>>>>>>> dev
    },
    { $set: body }
  );
  if (!user) return res.status(400).send({ message: "student not found" });

  res.sendStatus(200);
};
<<<<<<< HEAD

export async function activate(req, res) {
  const { studentId } = req.params;
  const school = await getSchoolOfManagerById(req.user.id);

  const user = await userModel.findOneAndUpdate(
    { _id: studentId, school: school._id },
    {
      $set: {
        active: true,
      },
    }
  );
  if (!user) return res.status(400).send({ message: "user not found" });
  res.sendStatus(200)
}
=======
>>>>>>> dev
