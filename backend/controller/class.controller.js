import classModel from "../models/class.model.js";
import userModel from "../models/user.model.js";
import { getSchoolOfManagerById } from "./utils.controller.js";

// manager requests list of classs
export const getClassList = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  // find list of classes where school is above school
  const classList = await classModel
    .find({
      school: school._id,
    })
    .populate("teacher");
  res.send(classList);
};

export const getClassById = async (req, res) => {
  const { classId } = req.params;
  const school = await getSchoolOfManagerById(req.user.id);

  // find list of classes where school is above school
  const classList = await classModel.findOne({
    _id: classId,
    school: school._id,
  });
  res.send(classList);
};

export const createClass = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const body = req.body;
  // create class
  const classItem = await classModel.create({
    name: body.name,
    teacher: body.teacher,
    school: school._id,
  });
  res.send(classItem);
};

export const deleteClass = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const { classId } = req.params;
  const user = await classModel.findOneAndDelete({
    _id: classId,
    school: school._id,
  });
  if (!user) return res.status(400).send({ message: "class not found" });

  await userModel.updateMany({ class: classId }, { $unset: { class: true } });

  res.sendStatus(200);
};

export const updateClass = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);

  const { classId } = req.params;

  const user = await classModel.findOneAndUpdate(
    {
      _id: classId,
      school: school._id,
    },
    {
      $set: {
        name: req.body.name,
        teacher: req.body.teacher,
      },
    }
  );
  if (!user) return res.status(400).send({ message: "class not found" });

  res.sendStatus(200);
};
