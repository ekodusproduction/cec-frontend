import styles from "./Login.module.css";
import Button from "../Buttons/Button";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();
  const [superAdminUsername, setSuperAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [superAdminUsername, adminPassword]);

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        whatsApp: superAdminUsername,
        password: adminPassword,
      };

      const login = "api/superadmin/login";

      const response = await axios.post(login, JSON.stringify(requestData), {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;
      const token = response?.data?.token;
      window.localStorage.setItem("accessToken", token);
      setAuth(data);
      setSuperAdminUsername("");
      setAdminPassword("");
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
          <p className={styles.para}>Please sign in to start the adventure</p>
        </div>
      </header>

      <p
        className={errMsg ? styles.error : styles.offscreen}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmitHandler}>
        <div className={styles.formControl}>
          <label htmlFor="superAdminUsername">Username</label>
          <input
            type="text"
            id="superAdminUsername"
            placeholder="Enter Super Admin Number"
            autoComplete="off"
            onChange={(e) => setSuperAdminUsername(e.target.value)}
            value={superAdminUsername}
            required
          />
        </div>

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
