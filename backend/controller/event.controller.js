import classModel from "../models/class.model.js";
import eventModel from "../models/event.model.js";
import { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
  getSchoolIdOfParentById,
} from "./utils.controller.js";

export const createEvent = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);

    const {
      start,
      end,
      title,
      description,
      class: classId,
      hasConsent,
    } = req.body;
    const userId = req.user.id;
    const newEvent = await eventModel.create({
      start,
      end,
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
    const { start, end, title, description, hasConsent } = req.body;
    const userId = req.user.id;
    const newEvent = await eventModel.create({
      start,
      end,
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
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "startDate and endDate are required" });
  }

  console.log("converted start date:", new Date(startDate));
  console.log("Converted end date:", new Date(endDate));

  try {
    let schoolId;

    if (role === Roles.MANAGER) {
      console.log("fetching event as Manager");
      const schoolId = await getSchoolOfManagerById(req.user.id);
      // $gt : >
      // $gte : >=
      // $lt : <
      // $lte : <=
      // $eq : ===
      // $ne : !==
      const events = await eventModel.find({
        start: { $gte: new Date(startDate), $lte: new Date(endDate) },
        school: schoolId,
      });

      res.status(200).json(events);
    } else if (role === Roles.TEACHER) {
      console.log("fetching event as Teacher");
      const schoolId = await getSchoolIdOfTeacherById(req.user.id);
      const events = await eventModel.find({
        start: { $gte: new Date(startDate), $lte: new Date(endDate) },
        school: schoolId,
      });
      res.status(200).json(events);
    } else if (role === Roles.PARENT) {
      console.log("fetching event as Parent");
      const schoolId = await getSchoolIdOfParentById(req.user.id);
      const events = await eventModel.find({
        start: { $gte: new Date(startDate), $lte: new Date(endDate) },
        school: schoolId,
      });
      res.status(200).json(events);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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
