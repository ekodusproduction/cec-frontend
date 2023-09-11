import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home/Home";
import Centers from "./pages/Centers/Centers";
import NewStudent from "./pages/NewStudent/NewStudent";
import Students from "./pages/Students/Students";
import RegisterCenter from "./components/Forms/RegisterCenter/RegisterCenter";
import StudentExtra from "./components/Forms/StudentExtra/StudentsExtra";
import CoursePage from "./pages/CoursesPage/CoursesPage";
import Summary from "./pages/Summary/Summary";
import NewCourse from "./pages/NewCourse/NewCourse";
import AddCenterAdmin from "./components/Forms/AddCenterAdmin/AddCenterAdmin";
import Login from "./components/login/Login";
import StudentDetail from "./pages/StudentDetail/StudentDetail";
import CenterDetail from "./pages/CenterDetail/CenterDetail";
import StudentExtraPage from "./pages/StudentExtraPage/StudentExtraPage";
import EditStudent from "./components/Forms/EditStudent/EditStudent";
import EditAdmin from "./components/Forms/EditAdmin/EditAdmin";
import EditCenter from "./components/Forms/EditCenter/EditCenter";
import ErrorPage from "./pages/ErrorPage";
import RequireAuth from "./components/RequireAuth";
import ChangePassword from "./components/Forms/ChangePassword/ChangePassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route path="login" element={<Login />} />

        {/* center Routes */}
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
            <Route path="courses/newcourse" element={<NewCourse />} />
            <Route path="newcenter" element={<RegisterCenter />} />
            <Route path="centers" element={<Centers />} />
            {/* <Route path="centeradmins" element={<CenterAdminList />} /> */}
            <Route path="centers/:id" element={<CenterDetail />} />
            <Route path="centers/:id/edit_center" element={<EditCenter />} />
            <Route path="student/:roll/edit" element={<EditStudent />} />
            <Route
              path="centers/:id/edit_center_admin"
              element={<EditAdmin />}
            />
            <Route
              path="centers/:id/changepassword"
              element={<ChangePassword />}
            />
            <Route path="studentExtra" element={<StudentExtra />} />
            <Route path="newAdmin" element={<AddCenterAdmin />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
