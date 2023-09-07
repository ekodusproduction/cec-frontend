import StudentExtra from "../../components/Forms/StudentExtra/StudentsExtra";
import { useParams } from "react-router";

const StudentExtraPage = () => {
  const { roll } = useParams();
  return <StudentExtra rollNumber={roll} />;
};

export default StudentExtraPage;
