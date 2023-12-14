import userModel, { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";
import messageModel from "../models/message.model.js";
import classModel from "../models/class.model.js";

export const getMessages = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);
    const messages = await messageModel
      .find({ school: school._id, class: undefined })
      .populate("user");

    res.send(messages);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });

    const messages = await messageModel
      .find({ school: schoolId, class: classObj._id })
      .populate("user");

    res.send(messages);
  } else if (role === Roles.PARENT) {
    const student = await userModel.findById(id);

    const messages = await messageModel
      .find({ school: student.school, class: student.class })
      .populate("user");

    res.send(messages);
  }
};

export const createMessage = async (req, res) => {
  const { role, id } = req.user;
  const user = await userModel.findById(id)
  const { text } = req.body;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);

    let message = await messageModel.create({
      text,
      user: id,
      school: school,
    });
    message = await message.populate("user");
    res.send(message);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });

    let message = await messageModel.create({
      text,
      user: id,
      school: schoolId,
      class: classObj._id,
    })
    message = await message.populate("user");
    res.send(message);
  } else if (role === Roles.PARENT) {
    const student = await userModel.findById(id);

    const message = await messageModel.create({
      text,
      user: id,
      school: student.school,
      class: student.class,
    });
    res.send(message);
  }
};
