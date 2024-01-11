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
      // nested populate
      .populate({
        path: "user",
        populate: {
          path: "class",
        },
      });

    res.send(messages);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });
    const teacher = await userModel.findById(id);

    let messages;
    if (teacher.freeTeacher)
      messages = await messageModel
        .find({ school: schoolId, class: undefined })
        // nested populate
        .populate({
          path: "user",
          populate: {
            path: "class",
          },
        });
    else
      messages = await messageModel
        .find({ school: schoolId, class: classObj._id })
        .populate("user");

    res.send(messages);
  } else if (role === Roles.PARENT) {
    const { forumType = "class" } = req.query;
    const student = await userModel.findById(id);

    const messages = await messageModel
      .find({
        school: student.school,
        class: forumType === "class" ? student.class : undefined,
      })
      .populate({
        path: "user",
        populate: {
          path: "class",
        },
      });

    res.send(messages);
  }
};

export const createMessage = async (req, res) => {
  const { role, id } = req.user;
  const { text, messageType } = req.body;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);

    let message = await messageModel.create({
      text,
      type: messageType,
      user: id,
      school: school,
    });
    message = await message.populate("user");
    res.send(message);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });
    const teacher = await userModel.findById(id);

    let message;
    if (teacher.freeTeacher) {
      message = await messageModel.create({
        text,
        type: messageType,
        user: id,
        school: schoolId,
      });
    } else {
      message = await messageModel.create({
        text,
        type: messageType,
        user: id,
        school: schoolId,
        class: classObj._id,
      });
    }
    message = await message.populate("user");
    res.send(message);
  } else if (role === Roles.PARENT) {
    const { forumType = "class" } = req.query;
    const student = await userModel.findById(id);
    if (forumType === "school" && messageType === "file")
      return res.status(400).send({
        message: "message type file does not supported in school forum",
      });
    let message = await messageModel.create({
      text,
      type: messageType,
      user: id,
      school: student.school,
      class: forumType === "school" ? undefined : student.class,
    });
    message = await message.populate({
      path: "user",
      populate: {
        path: "class",
      },
    });

    res.send(message);
  }
};

export const deleteMessage = async (req, res) => {
  const { id, role } = req.user;
  const { messageId } = req.params;

  const filter = { _id: messageId };
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);
    filter.school = school._id;
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });
    filter.school = schoolId;
    filter.class = classObj._id;
  } else filter.user = id;

  const result = await messageModel.findOneAndDelete(filter);
  if (!result)
    return res.status(400).send({
      message: "message not found",
    });

  res.sendStatus(200);
};
