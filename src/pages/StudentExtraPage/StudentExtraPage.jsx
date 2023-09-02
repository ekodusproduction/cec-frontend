import StudentExtra from "../../components/Forms/StudentExtra/StudentsExtra";
import { useParams } from "react-router";

const StudentExtraPage = () => {
  const { roll } = useParams();
  console.log(roll);
  return <StudentExtra rollNumber={roll} />;
};

export default StudentExtraPage;
