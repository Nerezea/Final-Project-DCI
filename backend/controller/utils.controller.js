import schoolModel from "../models/school.model.js";
import userModel from "../models/user.model.js";

// find school of manager
export const getSchoolOfManagerById = async (managerId) => {
  const school = await schoolModel.findOne({ admin: managerId });
  return school;
};

// find school of teacher
export const getSchoolIdOfTeacherById = async (teacherId) => {
  const teacher = await userModel.findById(teacherId);
  return teacher.school;
};

// find school of parent
export const getSchoolIdOfParentById = async (parentId) => {
  const parent = await userModel.findById(parentId);
  return parent.school;
};
