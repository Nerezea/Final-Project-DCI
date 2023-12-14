import event from "../models/event.model.js";
import { getSchoolOfManagerById } from "./utils.controller.js";
import classModel from "../models/class.model.js";
import eventModel from "../models/event.model.js";
import { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";

export const createEvent = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);

    const { date, title, description, class: classId, hasConsent } = req.body;
    const userId = req.user.id;
    const newEvent = await eventModel.create({
      date,
      title,
      description,
      hasConsent,
      creator: userId,
      school: school._id,
      class: classId,
    });
    res.status(201).json(newEvent);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });
    const { date, title, description, hasConsent } = req.body;
    const userId = req.user.id;
    const newEvent = await eventModel.create({
      date,
      title,
      description,
      hasConsent,
      creator: userId,
      school: schoolId,
      class: classObj._id,
    });
    res.status(201).json(newEvent);
  }
};

export const getEvents = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);
    const { start, end } = req.query;
    // $gt : >
    // $gte : >=
    // $lt : <
    // $lte : <=
    // $eq : ===
    // $ne : !==
    const events = await eventModel.find({
      date: { $gte: start, $lte: end },
      school: school._id,
    });
    res.status(200).json(events);
  } else if (role === Roles.TEACHER) {
    const { start, end } = req.query;
    const events = await eventModel.find({
      date: { $gte: start, $lte: end },
      creator: id,
    });
    res.status(200).json(events);
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { role, id } = req.user;

  if (role === Roles.MANAGER) {
    const event = await eventModel.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    if (!event) return res.status(400).send({ message: "event not found" });

    res.status(200).json(event);
  } else if (role === Roles.TEACHER) {
    const event = await eventModel.findOneAndUpdate(
      { _id: eventId, creator: id },
      req.body,
      {
        new: true,
      }
    );
    if (!event) return res.status(400).send({ message: "event not found" });

    res.status(200).json(event);
  }
};

export const deleteEvent = async (req, res) => {
  const event = await getSchoolOfManagerById(req.user.id);

  const { eventId } = req.params;
  await event.findByIdAndDelete(eventId);
  res.status(200).json({ message: "event deleted successfully" });
};
