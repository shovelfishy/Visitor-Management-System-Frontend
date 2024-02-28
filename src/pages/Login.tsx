import styles from "./Login.module.css";
import profile from "../assets/profile.svg";
import Password from "../components/password-login.tsx";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig.js";
import { Fragment, useEffect, useState } from "react";
// import jwt from 'jsonwebtoken';

// function handleChange(e:React.ChangeEvent<HTMLInputElement>){
//   const {name, value} = e.target
//   setUserLogin((prev) => {
//     return {...prev, [name]: value};
//   })
// }

function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [visibility, setVisibility] = useState("hidden");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    sessionStorage.getItem("closed") != "true" && setVisibility("visible");
  }, [sessionStorage]);

  const tempCloseDisclaimer = () => {
    setVisibility("hidden");
  };

  const closeDisclaimer = () => {
    sessionStorage.setItem("closed", "true");
    setVisibility("hidden");
  };

  const authUser = async () => {
    try {
      const res = await api.post(
        "/login",
        {
          username: userLogin.username,
          password: userLogin.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
      // console.log(token)
      // console.log(res.data);
      if (res.data != "ERROR") {
        navigate("/registration", { state: { userId: res.data } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div style={{ visibility: visibility as "visible" | "hidden" }}>
        <div className={styles.border} id={styles.disclaimer}></div>
        <div id={styles.disclaimer}>
          <span id={styles["close-button"]} onClick={tempCloseDisclaimer}>
            &times;
          </span>
          <h2>DISCLAIMER</h2>
          <p>
            This project is still undergoing development. I plan to continuously
            add features to it and eventually deploy it in my neighborhood. Upon
            logging in, you will be in the perspective of a neighborhood
            resident who's able to pre-register anticipated visitors.
            <br />
            <br />
            <span style={{ fontWeight: "bold" }}>
              Please use the following login details
              <br />
              Username: admin
              <br />
              Password: admin
            </span>
          </p>
          <button onClick={closeDisclaimer}>DON'T SHOW AGAIN</button>
        </div>
      </div>

      <div className={styles.container} id={styles.login}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <div className={styles.container} id={styles.glow}>
          <h1>PC RESIDENCE</h1>
          <div className={styles.glow}></div>
        </div>
        <form
          id={styles.login}
          onSubmit={(e) => e.preventDefault()}
          method="POST"
          noValidate
        >
          <div className={styles.input}>
            <img draggable="false" src={profile} className={styles.logo} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <Password userInfoState={handleChange} />
          <button className={styles.login} type="submit" onClick={authUser}>
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
