import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home";
import Center from "./pages/Center";
import Students from "./pages/Students";
import NewCenter from "./components/Forms/NewCenter/NewCenter";
import SelectCourse from "./SelectCourse/SelectCourse";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="center" element={<Center />} />
            <Route path="new" element={<Students />} />
            <Route path="multiform" element={<SelectCourse />} />
            <Route path="newcenter" element={<NewCenter />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
