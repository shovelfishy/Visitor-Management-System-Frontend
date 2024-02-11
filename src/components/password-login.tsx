import closedEye from "../assets/closed-eye.svg";
import openEye from "../assets/open-eye.svg";
import password from "../assets/password.svg";
import { useRef, useState } from "react";
import "./stylesheets/password-login.css";
// import { handleChange } from "../pages/Login";

function Password({ userInfoState }) {

    const visibility = useRef<HTMLInputElement>(null);
    let [toggleClass, setClassName] = useState("show-pwd");
    let [eyeIcon, setIcon] = useState(closedEye);

    const handleEvent = () => {
        if (eyeIcon === closedEye) {
            setIcon(openEye);
            visibility.current!.type = "text";
        } else {
            setIcon(closedEye);
            visibility.current!.type = "password";
        }

        setClassName("show-pwd activeA");
        setTimeout(() => {
        setClassName("show-pwd activeB");
        setTimeout(() => {
            setClassName("show-pwd");
        },310)
        },200)
        

    };
    return(
        <div className="input">
            <img src={password} className="logo" />
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
                eyeIcon === closedEye ? "logo closedEye" : "logo openEye"
                }
                draggable="false"
            />
            </div>
        </div>
    )   
}

export default Password;