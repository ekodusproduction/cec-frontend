import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./pages/Home";
import Center from "./pages/Center";
import Students from "./pages/Students";
import MultiForm from "./pages/MultiForm/Multiform";
import NewCenter from "./components/Forms/NewCenter/NewCenter";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="center" element={<Center />} />
            <Route path="new" element={<Students />} />
            <Route path="multiform" element={<MultiForm />} />
            <Route path="newcenter" element={<NewCenter />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
