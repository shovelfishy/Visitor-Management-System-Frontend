import { Fragment, useEffect, useRef, useState } from "react";
import TextInputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import api from "../api/axiosConfig";
import VisitorListComponent from "../components/VisitorListComponent";
import styles from "./User.module.css";
import { useLocation } from "react-router-dom";

function User() {
  const [visitorData, setVisitorData] = useState({
    name: "",
    date: "",
    car_plate: "",
    time: "",
  });

  //code this
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [warningText, setWarningText] = useState("");
  const location = useLocation();

  //TEMPORARY UNTIL JWT
  const getResidentID = (): string => {
    return location.state != null ? location.state.userId : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVisitorData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const IsCheckInValid = () => {
    for (const i in visitorData) {
      if (visitorData[i] == "") return false;
    }
    return true;
  };

  const duplicateEntry = (res) => {
    if (res.data.error == "Duplicate Entry Error") return true;
    return false;
  };

  const [timer, setTimer] = useState<any>();
  const checkIn = async () => {
    clearTimeout(timer);
    try {
      if (IsCheckInValid()) {
        const res = await api.post("/users/checkin", {
          ...visitorData,
          residentID: getResidentID(),
        });
        setButtonClicked(!buttonClicked);
        setWarningText(duplicateEntry(res) ? "This entry already exists" : "");
      } else {
        setWarningText("Please fill out all the fields");
      }
    } catch (error) {
      console.log(error);
    }

    let timeout = setTimeout(() => {
      setWarningText("");
    }, 10000);
    setTimer(timeout);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("overflow", "hidden");
  }, []);

  const [open, setOpen] = useState(true);
  const menu = open
    ? `${styles["hamburger-menu"]} ${styles.open}`
    : `${styles["hamburger-menu"]}`;
  const sidebar = open
    ? `${styles.sidebar} ${styles.open}`
    : `${styles.sidebar}`;

  return (
    <Fragment>
      <div className={sidebar}>
        <h1>HISTORY</h1>
        <div className={menu} onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.scroller}>
          <div className={styles["visitor-list"]}>
            <VisitorListComponent
              buttonClicked={buttonClicked}
              residentID={getResidentID()}
            />
          </div>
        </div>
      </div>

      <div
        className={`${styles.user} ${styles.container} ${
          open ? `${styles.open}` : ""
        }`}
      >
        <h1>VISITOR REGISTRATION</h1>
        <div className={`${styles.user} ${styles.grid}`}>
          <TextInputComponent
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Name"
          />
          <TextInputComponent
            onChange={handleChange}
            type="date"
            name="date"
            placeholder="Date"
          />
          <TextInputComponent
            onChange={handleChange}
            type="text"
            name="car_plate"
            placeholder="Car plate"
          />
          <TextInputComponent
            onChange={handleChange}
            type="time"
            name="time"
            placeholder="Time"
          />
        </div>
        <div className={styles["button-container"]}>
          <ButtonComponent onClick={checkIn}>Check In</ButtonComponent>
        </div>
        <p className={styles["warning-text"]}>{warningText}</p>
      </div>
    </Fragment>
  );
}

export default User;
