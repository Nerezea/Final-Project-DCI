import messageModel from "../models/message.model.js";
import userModel, { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";

export const getMessages = async (req, res) => {
  const { receiverId } = req.params;
  const { id } = req.user;
  const messages = await messageModel
    .find({
      $or: [
        {
          user: id,
          receiver: receiverId,
        },
        {
          user: receiverId,
          receiver: id,
        },
      ],
    })
    // nested populate
    .populate({
      path: "user",
      populate: {
        path: "class",
      },
    });

  res.send(messages);
};

export const createMessage = async (req, res) => {
  const { role, id } = req.user;
  const { text, messageType, receiver } = req.body;
  let schoolId;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);
    schoolId = school._id;
  } else if (role === Roles.TEACHER) {
    schoolId = await getSchoolIdOfTeacherById(id);
  } else if (role === Roles.PARENT) {
    const parent = await userModel.findById(id);
    schoolId = parent.school;
  }

  let message = await messageModel.create({
    text,
    type: messageType,
    user: id,
    school: schoolId,
    pv: true,
    receiver,
  });
  message = await message.populate({
    path: "user",
    populate: {
      path: "class",
    },
  });
  res.send(message);
};

export const deleteMessage = async (req, res) => {
  const { id } = req.user;
  const { messageId } = req.params;

  const result = await messageModel.findOneAndDelete({
    _id: messageId,
    user: id,
  });
  if (!result)
    return res.status(400).send({
      message: "message not found",
    });

  res.sendStatus(200);
};
