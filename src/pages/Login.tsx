import styles from "./Login.module.css";
import profile from "../assets/profile.svg";
import Password from "../components/password-login.tsx";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig.js";
import { useEffect, useState } from "react";
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }

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
  );
}

export default Login;
