import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout/adminLayout";
import ParTeaLayout from "./components/ParTeaLayout/parTeaLayout";
import Schools from "./pages/admin/schools/schools";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import TeacherForm from "./pages/manager/teacherForm/teacherForm";
import Teachers from "./pages/manager/teachers/teachers";
import FeedParent from "./pages/parent/feed/feed";
import Kalendar from "./pages/parent/calendar/calendar";

import Feed from "./pages/teacher/feed/feed";
import { Roles } from "./store/slice/auth.slice";
import Classes from "./pages/manager/classes/classes";
import ClassForm from "./pages/manager/classForm/classForm";
import Students from "./pages/manager/students/students";
import StudentForm from "./pages/manager/studentForm/studentForm";
import Register from "./pages/register/register";
import NewsFeedForm from "./pages/manager/newsFeedForm/newsFeedForm";
import Events from "./pages/manager/eventForm/events";

const AppRoutes = () => {
  const { isAuthenticated, role } = useSelector((store) => store.auth);

  function hasRole(_role) {
    return isAuthenticated && role === _role;
  }

  function getPanelAddress() {
    switch (role) {
      case Roles.MANAGER:
        return "/manager";
      case Roles.TEACHER:
        return "/teacher";
      case Roles.PARENT:
        return "/parent";
      case Roles.SUPER_ADMIN:
        return "/admin";
      default:
        return "/";
    }
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/preRegister" element={<Register />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to={getPanelAddress()} /> : <Login />
          }
        />

        <Route
          path="/manager/*"
          element={
            hasRole(Roles.MANAGER) ? <AdminLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="teachers" element={<Teachers />}></Route>
          <Route path="teachers/add" element={<TeacherForm />}></Route>
          <Route
            path="teachers/edit/:teacherId"
            element={<TeacherForm />}
          ></Route>
          <Route path="classes" element={<Classes />}></Route>
          <Route path="classes/add" element={<ClassForm />}></Route>
          <Route path="classes/edit/:classId" element={<ClassForm />}></Route>
          <Route path="students" element={<Students />}></Route>
          <Route path="students/add" element={<StudentForm />}></Route>
          <Route
            path="students/edit/:studentId"
            element={<StudentForm />}
          ></Route>
          <Route path="" element={<Navigate to="/manager/teachers" />}></Route>
          <Route path="events" element={<Events />}></Route>
          <Route path="feed" element={<NewsFeedForm />}></Route>
        </Route>
        <Route
          path="/teacher/*"
          element={
            hasRole(Roles.TEACHER) ? <AdminLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="feed" element={<Feed />}></Route>
          <Route path="" element={<Navigate to="/teacher/feed" />}></Route>
        </Route>
        <Route
          path="/parent/*"
          element={
            hasRole(Roles.PARENT) ? <ParTeaLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="feed" element={<FeedParent />}></Route>
          <Route path="preRegister" element={<p>register parent</p>}></Route>
          <Route path="" element={<Navigate to="/parent/feed" />}></Route>
          <Route path="calendar" element={<Kalendar />}></Route>
          <Route path="" element={<Navigate to="/parent/calendar" />}></Route>
        </Route>
        <Route
          path="/admin/*"
          element={
            hasRole(Roles.SUPER_ADMIN) ? <Layout /> : <Navigate to="/login" />
          }
        >
          <Route path="schools" element={<Schools />}></Route>
          <Route path="" element={<Navigate to="/admin/schools" />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
