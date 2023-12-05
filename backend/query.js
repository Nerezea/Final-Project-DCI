import classModel from "./models/class.model";
import feedModel from "./models/feed.model";
import schoolModel from "./models/school.model";
import teacherProfileModel from "./models/teacherProfile.model";

export const createFeedByAdmin = async () => {
  const admin = "126566d5s65d6s5d65ds4";
  const school = await schoolModel.findOne({ admin: admin });

  feedModel.create({
    creator: admin,
    title: "lorem title",
    description: "lorem description",
    school: school._id,
  });
};

export const createFeedByTeacher = async () => {
  const teacher = "d45s65d6s5d6s5d65sd65sd6";
  const teacherProfile = await teacherProfileModel.findById(teacher);
  const classRoom = await classModel.findOne({ teacher });

  feedModel.create({
    creator: teacher,
    title: "lorem title",
    description: "lorem description",
    school: teacherProfile.school,
    class: classRoom._id,
  });
};
