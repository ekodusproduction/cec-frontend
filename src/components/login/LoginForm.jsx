import Button from "../Buttons/Button";
import styles from "./Login.module.css";

const LoginForm = () => {
  return (
    <form>
      <div className={styles.formControl}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          placeholder="Enter your password"
        />
      </div>
      {/* <div className={styles.formControl} id={styles.check}>
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember Me</label>
      </div> */}
      <div className={styles.choiceContainer}>
        <div className={styles.formControl}>
          <input name="role" type="radio" id="super" />
          <label htmlFor="super">Super Admin</label>
        </div>
        <div className={styles.formControl}>
          <input name="role" type="radio" id="center" />
          <label htmlFor="center">Center Admin</label>
        </div>
      </div>
      <Button>Sign in</Button>
      {/* <div className={styles.new}>
        New on our platfrom? <a href="/">Create an account</a>
      </div> */}
    </form>
  );
};

export default LoginForm;
