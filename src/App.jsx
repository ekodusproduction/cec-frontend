import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home/Home";
import NewStudent from "./pages/NewStudent/NewStudent";
import Students from "./pages/Students/Students";
import CoursePage from "./pages/CoursesPage/CoursesPage";
import Summary from "./pages/Summary/Summary";
import Login from "./components/login/Login";
import StudentDetail from "./pages/StudentDetail/StudentDetail";
import StudentExtraPage from "./pages/StudentExtraPage/StudentExtraPage";
import ErrorPage from "./pages/ErrorPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="student" element={<Students />} />
            <Route path="student/:roll" element={<StudentDetail />} />
            <Route
              path="student/:roll/studentdetails"
              element={<StudentExtraPage />}
            />
            <Route path="courses" element={<CoursePage />} />
            <Route path="newstudent" element={<NewStudent />} />
            <Route path="newstudent/summary" element={<Summary />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
