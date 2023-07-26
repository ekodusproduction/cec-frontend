import LoginForm from "./LoginForm";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <section className={styles.loginContainer}>
      <header>
        <div className={styles.logo}>
          <img
            src="/images/icons/brands/google.png"
            alt="company logo"
            className={styles.logoIcon}
          />
          <span>sneat</span>
        </div>
        <div className={styles.welcome}>
          <p className={styles.title}>Welcome to Sneat! 👋</p>
          <p className={styles.para}>
            Please sign-in to your account and start the adventure
          </p>
        </div>
        <LoginForm />
      </header>
    </section>
  );
};

export default Login;
