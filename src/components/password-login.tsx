import closedEye from "../assets/closed-eye.svg";
import openEye from "../assets/open-eye.svg";
import password from "../assets/password.svg";
import { useRef, useState } from "react";
import componentStyles from "./stylesheets/password-login.module.css";
import styles from "../pages/Login.module.css";
// import { handleChange } from "../pages/Login";

function Password({ userInfoState }) {
  const visibility = useRef<HTMLInputElement>(null);
  let [toggleClass, setClassName] = useState(`${componentStyles["show-pwd"]}`);
  let [eyeIcon, setIcon] = useState(closedEye);

  const handleEvent = () => {
    if (eyeIcon === closedEye) {
      setIcon(openEye);
      visibility.current!.type = "text";
    } else {
      setIcon(closedEye);
      visibility.current!.type = "password";
    }

    setClassName(`${componentStyles["show-pwd"]} ${componentStyles.activeA}`);
    setTimeout(() => {
      setClassName(`${componentStyles["show-pwd"]} ${componentStyles.activeB}`);
      setTimeout(() => {
        setClassName(`${componentStyles["show-pwd"]}`);
      }, 310);
    }, 200);
  };
  return (
    <div className={styles.input}>
      <img src={password} className={styles.logo} />
      <input
        type="password"
        placeholder="Password"
        ref={visibility}
        name="password"
        onChange={userInfoState}
        required
      />
      <div className={toggleClass} onClick={handleEvent}>
        <img
          src={eyeIcon}
          className={
            eyeIcon === closedEye
              ? `${componentStyles.logo} ${componentStyles.closedEye}`
              : `${componentStyles.logo} ${componentStyles.openEye}`
          }
          draggable="false"
        />
      </div>
    </div>
  );
}

export default Password;
