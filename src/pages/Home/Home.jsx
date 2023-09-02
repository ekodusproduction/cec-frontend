import { SuperAdminHome } from "./SuperAdminHome";
import { CenterAdminHome } from "./CenterAdminHome";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { isSuper } = useAuth();

  return <>{isSuper ? <SuperAdminHome /> : <CenterAdminHome />}</>;
};

export default Home;
