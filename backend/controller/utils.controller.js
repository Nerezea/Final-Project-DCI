import schoolModel from "../models/school.model.js";

// find school of manager
export const getSchoolOfManagerById = async (managerId) => {
  const school = await schoolModel.findOne({ admin: managerId });
  return school;
};

