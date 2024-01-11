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

export const generateUniqueFileName = (fileName, encoded) => {
  fileName.charAt(0)
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars("secret").reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};



export {default as user}  from 'jsonwebtoken'


