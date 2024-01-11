import sickRestModel from "../models/sick.model.js";
import classModel from "../models/class.model.js";
import userModel, { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";

export const createSickRest = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.PARENT) {
    const student = await userModel.findById(id);

    const { from, to, title, description, image } = req.body;
    const newSickRest = await sickRestModel.create({
      from,
      to,
      title,
      description,
      image,
      user: id,
      school: student.school,
      class: student.class,
    });
    res.status(201).json(newSickRest);
  }
};

export const getSickRests = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);

    const sickRests = await sickRestModel
      .find({
        school: school._id,
      })
      .populate("class")
      .populate("user");
    res.status(200).json(sickRests);
  } else if (role === Roles.TEACHER) {
    const classObj = await classModel.findOne({ teacher: id });
    const teacher = await userModel.findById(id);
    if (teacher.freeTeacher)
      return res
        .status(400)
        .send({ message: "you don't access to sick rest data" });
    const filter = {
      user: id,
    };
    if (!teacher.freeTeacher) filter.class = classObj._id;

    const sickRests = await sickRestModel.find().populate("class")
    .populate("user");
    res.status(200).json(sickRests);
  } else if (role === Roles.PARENT) {
    const sickRests = await sickRestModel.find({
      user: id,
    });
    res.status(200).json(sickRests);
  }
};

export const deleteSickRest = async (req, res) => {
  const { role } = req.user;
  if (role === Roles.PARENT) {
    // const sickRestId  = req.params.id;
    const { id: sickRestId } = req.params;
    const sickRest = await sickRestModel.findOneAndDelete({
      _id: sickRestId,
      user: id,
    });
    if (!sickRest)
      return res.status(400).send({ message: "sickRest not found" });
    res.status(200).json({ message: "sickRest deleted successfully" });
  }
};
