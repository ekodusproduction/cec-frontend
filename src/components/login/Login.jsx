import styles from "./Login.module.css";
import Button from "../Buttons/Button";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();
  const [userType, setUserType] = useState("super");
  const [superAdminUsername, setSuperAdminUsername] = useState("");
  const [centerName, setCenterName] = useState("");
  const [centerCode, setCenterCode] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [userType, centerName, centerCode, superAdminUsername, adminPassword]);

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const requestData = {};

      if (userType === "center") {
        (requestData.centerCode = centerCode),
          (requestData.centerName = centerName),
          (requestData.password = adminPassword);
      } else if (userType === "super") {
        requestData.whatsApp = superAdminUsername;
        requestData.password = adminPassword;
      }

      const login =
        userType === "center" ? "api/center/login" : "api/superadmin/login";

      const response = await axios.post(login, JSON.stringify(requestData), {
        headers: { "Content-Type": "application/json" },
      });

      const { isSuperAdmin } = response.data.data;
      const data = response.data;
      const token = response?.data?.token;
      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem("isSuperAdmin", isSuperAdmin);
      setAuth(data);
      setSuperAdminUsername("");
      setCenterName("");
      setCenterCode("");
      setAdminPassword("");
      setUserType("");
      navigate("/");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response.data.message);
      } else if (err.response?.status === 401) {
        setErrMsg("UnAuthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section className={styles.loginContainer}>
      <header>
        <div className={styles.logo}>
          <img
            src="/images/CEC.png"
            alt="company logo"
            className={styles.logoIcon}
          />
        </div>
        <div className={styles.welcome}>
          <p className={styles.title}>Welcome to CEC! 👋</p>
          <p className={styles.para}>Please select your appropriate role</p>
        </div>
      </header>

      <p
        className={errMsg ? styles.error : styles.offscreen}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmitHandler}>
        <div className={styles.radioContainer}>
          <div className={styles.radioControl}>
            <input
              type="radio"
              id="super"
              name="userType"
              value="super"
              checked={userType === "super"}
              onChange={() => setUserType("super")}
            />
            <label htmlFor="super">Super admin</label>
          </div>
          <div className={styles.radioControl}>
            <input
              type="radio"
              id="center"
              name="userType"
              value="center"
              checked={userType === "center"}
              onChange={() => setUserType("center")}
            />
            <label htmlFor="center">Center admin</label>
          </div>
        </div>
        {userType === "center" && (
          <div>
            <div className={styles.formControl}>
              <label htmlFor="centerName">Center Name</label>
              <input
                type="text"
                id="centerName"
                placeholder="Enter Center Name"
                autoComplete="off"
                onChange={(e) => setCenterName(e.target.value)}
                value={centerName}
                required
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="centerCode">Center Code</label>
              <input
                type="number"
                id="centerCode"
                placeholder="Enter Center Code"
                autoComplete="off"
                onChange={(e) => setCenterCode(e.target.value)}
                value={centerCode}
                required
              />
            </div>
          </div>
        )}
        {userType === "super" && (
          <div className={styles.formControl}>
            <label htmlFor="superAdminUsername">Username</label>
            <input
              type="text"
              id="superAdminUsername"
              placeholder="Enter Super Admin Username"
              autoComplete="off"
              onChange={(e) => setSuperAdminUsername(e.target.value)}
              value={superAdminUsername}
              required
            />
          </div>
        )}
        <div className={styles.formControl}>
          <label htmlFor="adminPassword">Password</label>
          <input
            type="password"
            id="adminPassword"
            required
            placeholder="Enter your password"
            autoComplete="off"
            onChange={(e) => setAdminPassword(e.target.value)}
            value={adminPassword}
          />
        </div>
        <Button>Sign in</Button>
      </form>
    </section>
  );
};

export default Login;
