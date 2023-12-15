import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import AdminLayout from "./components/AdminLayout/adminLayout";
import ParTeaLayout from "./components/ParTeaLayout/parTeaLayout";

// Schooladministration
import Schools from "./pages/admin/schools/schools";

// Routes for public
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

// Routes for manager
import TeacherForm from "./pages/manager/teacherForm/teacherForm";
import Teachers from "./pages/manager/teachers/teachers";
import Classes from "./pages/manager/classes/classes";
import ClassForm from "./pages/manager/classForm/classForm";
import Students from "./pages/manager/students/students";
import StudentForm from "./pages/manager/studentForm/studentForm";
import NewsFeedForm from "./pages/manager/newsFeedForm/newsFeedForm";
import Events from "./pages/manager/eventForm/events";

// Routes for parents
import FeedParent from "./pages/parent/feed/feed";
// import KalendarParent from "./pages/parent/calendar/calendar";

// Routes for teachers
import FeedTeacher from "./pages/teacher/feed/feed";
import KalendarTeacher from "./pages/teacher/calendar/calendar";
import ProfileTeacher from "./pages/teacher/profile/profileTeachers";

// import Roles from redux slice
import { Roles } from "./store/slice/auth.slice";

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

        {/* manager */}
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

        {/* teacher */}
        <Route
          path="/teacher/*"
          element={
            hasRole(Roles.TEACHER) ? <ParTeaLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="feed" element={<FeedTeacher />}></Route>
          <Route path="" element={<Navigate to="/teacher/feed" />}></Route>
          <Route path="calendar" element={<KalendarTeacher />}></Route>
          <Route path="profile" element={<ProfileTeacher />}></Route>
        </Route>

        {/* parent */}
        <Route
          path="/parent/*"
          element={
            hasRole(Roles.PARENT) ? <ParTeaLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="feed" element={<FeedParent />}></Route>
          <Route path="preRegister" element={<p>register parent</p>}></Route>
          <Route path="" element={<Navigate to="/parent/feed" />}></Route>
          <Route path="calendar" element={<KalendarTeacher />}></Route>
        </Route>

        {/* admin */}
        <Route
          path="/admin/*"
          element={
            hasRole(Roles.SUPER_ADMIN) ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" />
            )
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
