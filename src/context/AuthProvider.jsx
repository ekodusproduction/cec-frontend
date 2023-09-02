import { createContext, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const isSuper = auth?.data?.isSuperAdmin;
  const centerCode = auth?.data?.centerCode;
  const centerId = auth?.data?._id;

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isSuper, centerCode, centerId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
