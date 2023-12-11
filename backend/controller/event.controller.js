import mangoose, { Schema } from "mongoose";

import event from "../models/event.model.js";
import { getSchoolOfManagerById } from "./utils.controller.js";

export const createEvent = async (req, res) => {  
  const { start, end, title, description, schoolId, classId } = req.body;
  const userId = req.userId;
  const newEvent = await event.create({
    start,
    end,
    title,
    description,
    creator: userId,
    school: schoolId,
    class: classId,
  });
  res.status(201).json(newEvent);
}


export const getEvent = async (req, res) => {
  
  const { eventId } = req.params;
  const event = await getSchoolOfManagerById(req.user.id);
  res.status(200).json(event);
}

export const getEvents = async (req, res) => {
  const { classId } = req.query;
  const events = await event.find({ class: classId });
  res.status(200).json(events);
}


export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { start, end, title, description } = req.body;
  const event = await event.findByIdAndUpdate(
    eventId,
    { start, end, title, description },
    { new: true }
  );
  res.status(200).json(event);
}

export const deleteEvent = async (req, res) => {
  const event = await getSchoolOfManagerById(req.user.id);

  const { eventId } = req.params;
  await event.findByIdAndDelete(eventId);
  res.status(200).json({ message: "event deleted successfully" });
}


