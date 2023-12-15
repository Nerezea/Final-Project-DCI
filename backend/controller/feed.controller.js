import feedModel from "../models/feed.model.js";
import classModel from "../models/class.model.js";
import { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";

export const createFeed = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);

    const { date, title, description, image, class: classId } = req.body;
    const userId = req.user.id;
    const newFeed = await feedModel.create({
      date,
      title,
      description,
      image,
      creator: userId,
      school: school._id,
      class: classId,
    });
    res.status(201).json(newFeed);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const classObj = await classModel.findOne({ teacher: id });
    const { date, title, description, image } = req.body;
    const userId = req.user.id;
    const newFeed = await feedModel.create({
      date,
      title,
      description,
      image,
      creator: userId,
      school: schoolId,
      class: classObj._id,
    });
    res.status(201).json(newFeed);
  }
};



export const getFeeds = async (req, res) => {
  const role = req.user.role;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);

    const { start, end } = req.query;
    const feeds = await feedModel.find({
      date: { $gte: start, $lte: end },
      school: school._id,
    });
    res.status(200).json(feeds);
  } else if (role === Roles.TEACHER) {
    const { start, end } = req.query;
    const feeds = await feedModel.find({
      date: { $gte: start, $lte: end },
      creator: req.user.id,
    });
    res.status(200).json(feeds);
  }
};

export const updateFeed = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const { feedId } = req.params;

    const feed = await feedModel.findByIdAndUpdate(
      feedId,
      { $set: req.body },
      { new: true }
    );
    if (!feed) return res.status(400).send({ message: "feed not found" });

    res.status(200).json(feed);
  } else if (role === Roles.TEACHER) {
    const { feedId } = req.params;

    const feed = await feedModel.findOneAndUpdate(
      { _id: feedId, creator: id },
      { $set: req.body },
      { new: true }
    );
    if (!feed) return res.status(400).send({ message: "feed not found" });

    res.status(200).json(feed);
  }
};

export const deleteFeed = async (req, res) => {
  const { role, id } = req.user;
  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(req.user.id);

    const { feedId } = req.params;
    const feed = await feedModel.findOneAndDelete({
      _id: feedId,
      school: school._id,
    });
    if (!feed) return res.status(400).send({ message: "feed not found" });
    res.status(200).json({ message: "feed deleted successfully" });
  } else if (role === Roles.TEACHER) {
    const { feedId } = req.params;
    const feed = await feedModel.findOneAndDelete({
      _id: feedId,
      creator: id,
    });
    if (!feed) return res.status(400).send({ message: "feed not found" });
    res.status(200).json({ message: "feed deleted successfully" });
  }
};
