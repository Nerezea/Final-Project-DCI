import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import Landing from "../view/pages/landing/landing.jsx";
import Login from "../view/pages/login/login.jsx";
import Newsfeed from "../view/pages/newsfeed/newsfeed.jsx";
import NotFoundPage from "../view/pages/notfoundpage/notfoundpage.jsx";
import Teacher from "../view/pages/teacher/teacher.jsx";
import TeacherEvents from "../view/pages/teacher/teacherevents.jsx";
import Manager from "../view/pages/admin/manager.jsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/teacher">
          <Route index element={<Teacher />} />
          <Route path=":events" element={<TeacherEvents />} />
        </Route>
        <Route path="/manager">
          <Route index element={<Manager />} />
          <Route path=":events" element={<TeacherEvents />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
