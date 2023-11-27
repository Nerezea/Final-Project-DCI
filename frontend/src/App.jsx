import { Route, Routes } from "react-router-dom";
import Layout from "./view/components/Layout.jsx";
import Landing from "./view/pages/landing.jsx";
import Login from "./view/pages/login.jsx";
import Newsfeed from "./view/pages/newsfeed.jsx";
import NotFoundPage from "./view/pages/notfoundpage.jsx";
import Teacher from "./view/pages/teacher.jsx";
import TeacherEvents from "./view/pages/teacherevents.jsx";

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
