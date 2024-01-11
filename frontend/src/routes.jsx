import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Schools from "./pages/admin/schools/schools";
import Landing from "./pages/landing/landing";
import Loader from "./pages/loader/loader";
import Login from "./pages/login/login";
import ClassForm from "./pages/manager/classForm/classForm";
import Classes from "./pages/manager/classes/classes";
import Events from "./pages/manager/events/events";
import NewsFeed from "./pages/manager/newsFeed/newsFeed";
import StudentForm from "./pages/manager/studentForm/studentForm";
import Students from "./pages/manager/students/students";
import TeacherStudents from "./pages/teacher/students/students";
import TeacherForm from "./pages/manager/teacherForm/teacherForm";
import Teachers from "./pages/manager/teachers/teachers";
import Register from "./pages/register/register";
import ParentCalendar from "./pages/parent/calendar/calendar";
import { Roles } from "./store/slice/auth.slice";
import Forum from "./pages/forum/forum";
import PV from "./pages/forum copy/pv";
import SickRest from "./pages/parent/sickRest/sickRest";
import SickRestManager from "./pages/manager/sickRest/sickRest";
import ParentFeed from "./pages/parent/newsFeed/newsFeed";
import NewsFeedDetail from "./pages/parent/newsFeed/newsFeedDetail/newsFeedDetail";
import ParentEvent from "./pages/parent/newsFeed copy/events";
import EventDetail from "./pages/parent/newsFeed copy/eventDetail/eventDetail";
import FormContact from "./components/contact/contactform";
import EditProfile from "./pages/editProfile/editProfile";
import ErrorPage from "./components/404/404";


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
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader ? (
        <Loader setShowLoader={setShowLoader} />
      ) : (
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
              hasRole(Roles.MANAGER) ? <Layout /> : <Navigate to="/login" />
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
            <Route path="events" element={<Events />}></Route>
            <Route path="feed" element={<NewsFeed />}></Route>
            <Route path="forum" element={<Forum />}></Route>
            <Route path="editProfile" element={<EditProfile />}></Route>
            <Route path="sickRest" element={<SickRestManager />}></Route>

            <Route
              path=""
              element={<Navigate to="/manager/teachers" />}
            ></Route>
          </Route>
          <Route
            path="/teacher/*"
            element={
              hasRole(Roles.TEACHER) ? <Layout /> : <Navigate to="/login" />
            }
          >
            <Route path="feed" element={<NewsFeed />}></Route>
            <Route path="events" element={<Events />}></Route>
            <Route path="students" element={<TeacherStudents />}></Route>
            <Route path="forum" element={<Forum />}></Route>
            <Route path="sick" element={<SickRestManager />}></Route>
            <Route path="editProfile" element={<EditProfile />}></Route>
            <Route path="" element={<Navigate to="/teacher/feed" />}></Route>
          </Route>
          <Route
            path="/parent/*"
            element={
              hasRole(Roles.PARENT) ? <Layout /> : <Navigate to="/login" />
            }
          >
            <Route path="feed" element={<ParentFeed/>}></Route>
            <Route path="feed/:id" element={<NewsFeedDetail/>}></Route>
            <Route path="forum" element={<Forum />}></Route>
            <Route path="calendar" element={<ParentCalendar />}></Route>
            <Route path="sickRest" element={<SickRest />}></Route>
            <Route path="events" element={<ParentEvent />}></Route>
            <Route path="events/:id" element={<EventDetail />}></Route>
            <Route path="editProfile" element={<EditProfile />}></Route>
            <Route path="" element={<Navigate to="/parent/feed" />}></Route>
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
          <Route
            path="/pv/*"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          >
            <Route path=":id" element={<PV />}></Route>
          </Route>
          <Route path="*" element={<ErrorPage/>  }></Route>
          <Route path="/FormContact" element={<FormContact/>  }></Route>
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
