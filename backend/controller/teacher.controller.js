import classModel from "../models/class.model.js";
import schoolModel from "../models/school.model.js";
import userModel, { Roles } from "../models/user.model.js";
import { hashPassword } from "./hash.controller.js";
import { getSchoolOfManagerById } from "./utils.controller.js";

// manager requests list of teachers
export const getTeachers = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);
  // find list of users where role is teacher and her/his school is above school
  const teachers = await userModel.find({
    role: Roles.TEACHER,
    school: school._id,
  });
  res.send(teachers);
};

// manager request one teacher by id
export const getTeacherById = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const school = await getSchoolOfManagerById(req.user.id);
    // find list of users where role is teacher and her/his school is above school
    const teacher = await userModel.findOne({
      _id: teacherId,
      school: school._id,
    });
    res.send(teacher);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "teacher not found" });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const school = await getSchoolOfManagerById(req.user.id);

    const body = req.body;
    // hash password
    const hashedPassword = await hashPassword(body.password);
    // create teacher
    const existUser = await userModel.findOne({ email: body.email });
    if (existUser)
      return res.status(400).send({ message: "teacher already exists" });

    const user = await userModel.create({
      email: body.email,
      password: hashedPassword,
      fullName: body.fullName,
      phone: body.phone,
      role: Roles.TEACHER,
      school: school._id,
      image: body.image,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: "some error acured" });
  }
};

export const deleteTeacher = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);
  const { teacherId } = req.params;
  const user = await userModel.findOneAndDelete({
    _id: teacherId,
    school: school._id,
  });
  if (!user) return res.status(400).send({ message: "teacher not found" });
  await classModel.findOneAndUpdate(
    { teacher: teacherId },
    { $unset: { teacher: true } }
  );

  res.sendStatus(200);
};

export const updateTeacher = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const body = req.body;

  if (body.password) body.password = await hashPassword(body.password);

  const { teacherId } = req.params;

  if (body.email) {
    const existUser = await userModel.findOne({
      email: body.email,
      // _id !== teacherId
      _id: { $ne: teacherId },
    });
    if (existUser)
      return res.status(400).send({ message: "this email already exists" });
  }


  const user = await userModel.findOneAndUpdate({
    _id: teacherId,
    school: school._id,
  },{$set : body});
  if (!user) return res.status(400).send({ message: "teacher not found" });
  user.set(body);
  // if (body.email) user.email = body.email;
  // if (body.password) user.email = body.password;
  // if (body.fullName) user.fullName = body.fullName;
  // if (body.phone) user.phone = body.phone;
  // if (body.image) {
  //   user.image = body.image;
  // }
  // await user.save();

  res.sendStatus(200);
};
