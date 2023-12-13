
import event from "../models/event.model.js";
import { getSchoolOfManagerById } from "./utils.controller.js";

export const createEvent = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const { date, title, description, class: classId, hasConsent } = req.body;
  const userId = req.user.id;
  const newEvent = await event.create({
    date,
    title,
    description,
    hasConsent,
    creator: userId,
    school: school._id,
    class: classId,
  });
  res.status(201).json(newEvent);
};

export const getEvents = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const { start, end } = req.query;
  // $gt : >
  // $gte : >=
  // $lt : <
  // $lte : <=
  // $eq : ===
  // $ne : !==
  const events = await event.find({
    date: { $gte: start, $lte: end },
    school: school._id,
  });
  res.status(200).json(events);
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { start, end, title, description } = req.body;
  const event = await event.findByIdAndUpdate(
    eventId,
    { start, end, title, description },
    { new: true }
  );
  res.status(200).json(event);
};

export const deleteEvent = async (req, res) => {
  const event = await getSchoolOfManagerById(req.user.id);

  const { eventId } = req.params;
  await event.findByIdAndDelete(eventId);
  res.status(200).json({ message: "event deleted successfully" });
};
