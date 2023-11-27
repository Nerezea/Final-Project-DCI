
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Layout from "./components/layout/layout";
import Teachers from "./pages/manager/teachers/teachers";
import Feed from "./pages/teacher/feed/feed";
import FeedParent from "./pages/parent/feed/feed";
import Schools from "./pages/admin/schools/schools";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/manager/*" element={<Layout />}>
        <Route path="teachers" element={<Teachers />}></Route>
        <Route path="" element={<Navigate to="/manager/teachers" />}></Route>
      </Route>
      <Route path="/teacher/*" element={<Layout />}>
        <Route path="feed" element={<Feed />}></Route>
        <Route path="" element={<Navigate to="/teacher/feed" />}></Route>
      </Route>
      <Route path="/parent/*" element={<Layout />}>
        <Route path="feed" element={<FeedParent />}></Route>
        <Route path="preRegister" element={<p >register parent</p>}></Route>
        <Route path="" element={<Navigate to="/parent/feed" />}></Route>
      </Route>
      <Route path="/admin/*" element={<Layout />}>
        <Route path="schools" element={<Schools />}></Route>
        <Route path="" element={<Navigate to="/admin/schools" />}></Route>
      </Route>
    </Routes>
  );
};


export default AppRoutes;

