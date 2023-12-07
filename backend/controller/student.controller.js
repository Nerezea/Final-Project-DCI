import mongoose, { Schema } from "mongoose";
import userModel, { Roles } from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";
import { getSchoolOfManagerById } from "./utils.controller.js";

// manager requests list of teachers
export const getStudents = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const classId = req.query.class;
  // find list of users where role is teacher and her/his school is above school
  const query = {
    role: Roles.PARENT,
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

  const body = req.body;
  // hash password
  const hashedPassword = await hashPassword(body.password);
  // create teacher
  const user = await userModel.create({
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
  });
  res.send(user);
};

export const deleteStudent = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const { studentId } = req.params;
  const user = await userModel.findOneAndDelete({
    _id: studentId,
    school: school._id,
  });
  if (!user) return res.status(400).send({ message: "student not found" });

  res.sendStatus(200);
};

export const updateStudent = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const body = req.body;

  if (body.password) body.password = await hashPassword(body.password);

  const { studentId } = req.params;

  const user = await userModel.findOneAndUpdate(
    {
      _id: studentId,
      school: school._id,
    },
    { $set: body }
  );
  if (!user) return res.status(400).send({ message: "student not found" });

  res.sendStatus(200);
};

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
