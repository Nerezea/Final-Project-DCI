import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";
import Landing from "../view/pages/landing/landing.jsx";
import Loader from "../view/pages/loader/loader.jsx";
import Login from "../view/pages/login/login.jsx";
import Newsfeed from "../view/pages/newsfeed/newsfeed.jsx";
import NotFoundPage from "../view/pages/notfoundpage/notfoundpage.jsx";
import Teacher from "../view/pages/teacher/teacher.jsx";
import TeacherEvents from "../view/pages/teacher/teacherevents.jsx";
import Manager from "../view/pages/admin/manager.jsx";
import { useEffect, useState } from "react";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 3500);
  }, []);

  const renderLoader = () => {
    const { pathname } = location;

    if (showLoader && pathname === "/") {
      return <Loader />;
    }
    return null;
  };

  return (
    <div>
      {renderLoader()}
      {!showLoader && (
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
      )}
    </div>
  );
};

export default App;