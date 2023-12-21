import mongoose, { Schema } from "mongoose";
import userModel, { Roles } from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";
import classModel from "../models/class.model.js";

// manager requests list of teachers
export const getStudents = async (req, res) => {
  const { id, role } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);

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
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });

    const students = await userModel.find({
      active: true,
      role: Roles.PARENT,
      school: schoolId,
      class: classObj._id,
    });
    res.send(students);
  }
};

export const getStudentById = async (req, res) => {
  const { id, role } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);

    const students = await userModel.findOne({
      role: Roles.PARENT,
      school: school,
      _id: req.params.id,
    });
    res.send(students);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(req.user.id);
    const classObj = await classModel.findOne({ teacher: id });

    const students = await userModel.findOne({
      role: Roles.PARENT,
      school: schoolId,
      _id: req.params.id,
      class: classObj._id,
    });
    res.send(students);
  }
};

export const createStudent = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const body = req.body;

  const { email } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(400).send({ message: "email already exists" });
  // hash password
  const hashedPassword = await hashPassword(body.password);
  // create teacher
  user = await userModel.create({
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
  res.sendStatus(200);
}



export const getMyTeacher = async (req, res) => {
  const { id } = req.user;

  const parent = await userModel
    .findById(id)
    .populate({ path: "class", populate: { path: "teacher" } });
  if (!parent?.class?.teacher)
    return res.status(400).send({ message: "not found" });

  // const parent = await userModel.findById(id);
  // if (!parent) return res.status(400).send({ message: "user not found" });

  // const classObj = await classModel.findById(parent.class);
  // if (!classObj) return res.status(400).send({ message: "class not found" });

  // const teacher = await userModel.findById(classObj.teacher);
  // if (!teacher) return res.status(400).send({ message: "teacher not found" });

  res.send(parent.class.teacher);
};
