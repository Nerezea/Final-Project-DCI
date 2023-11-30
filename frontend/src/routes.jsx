
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Layout from "./components/layout/layout";
import Teachers from "./pages/manager/teachers/teachers";
import Feed from "./pages/teacher/feed/feed";
import FeedParent from "./pages/parent/feed/feed";
import Schools from "./pages/admin/schools/schools";
import { useSelector } from "react-redux";
import { Roles } from "./store/slice/auth.slice";
import AddTeacher from "./pages/manager/addTeacher/addTeacher";

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
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={getPanelAddress()} /> : <Login />}
      />
      <Route
        path="/manager/*"
        element={hasRole(Roles.MANAGER) ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="teachers" element={<Teachers />}></Route>
        <Route path="teachers/add" element={<AddTeacher />}></Route>
        <Route path="" element={<Navigate to="/manager/teachers" />}></Route>
      </Route>
      <Route
        path="/teacher/*"
        element={hasRole(Roles.TEACHER) ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="feed" element={<Feed />}></Route>
        <Route path="" element={<Navigate to="/teacher/feed" />}></Route>
      </Route>
      <Route
        path="/parent/*"
        element={hasRole(Roles.PARENT) ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="feed" element={<FeedParent />}></Route>
        <Route path="preRegister" element={<p>register parent</p>}></Route>
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
    </Routes>
  );
};

export default AppRoutes;
