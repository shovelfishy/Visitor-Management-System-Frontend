import { Fragment, useEffect, useRef, useState } from "react";
import TextInputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios";
import api from "../api/axiosConfig";
import VisitorListComponent from "../components/VisitorListComponent";

function User() {

  const [visitorData, setVisitorData] = useState({
    name: "",
    date: "",
    car_plate: "",
    time: ""
  });

  //code this
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [ownerID, setownerID] = useState("64b8cf54684b03a37f873d71");

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setVisitorData((prev) => {
      return {...prev, [name]: value};
    })
  }

  const checkInValid = () => {
    for(const i in visitorData){
      if(visitorData[i] == "") return false;
    }
    return true;
  }

  const duplicateEntry = (res) => {
    if(res.data.error == "Duplicate Entry Error") return true
    return false
  }

  const [timer, setTimer] = useState<any>()
  const checkIn = async () => {
    clearTimeout(timer)
    try {
      if(checkInValid()){
        const res = await api.post("/users/checkin", visitorData)
        setButtonClicked(!buttonClicked)
        setWarningText((duplicateEntry(res) ? "This entry already exists" : "")) 
      } else {
        setWarningText("Please fill out all the fields")
        
      }
    } catch (error) {
      console.log(error)
    }

    let timeout = setTimeout(() => {setWarningText("")}, 10000)
    setTimer(timeout)
  }

  useEffect(() => {
    document.documentElement.style.setProperty('overflow', 'hidden');
  },[])

  const [open, setOpen] = useState(true); 
  const menu = open ? "hamburger-menu open" : "hamburger-menu"
  const sidebar = open ? "sidebar open" : "sidebar"

  return (
  <Fragment>
    <div className={sidebar}>
      <h1>HISTORY</h1>
      <div className={menu} onClick={()=>setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="scroller">
        <div className="visitor-list">
          <VisitorListComponent buttonClicked={buttonClicked} ownerID={ownerID}/>
        </div>
      </div>
    </div>
    
    <div className={`user container ${open?"open":""}`}>
      <h1>VISITOR DETAILS</h1>
      <div className="user grid">
        <TextInputComponent onChange={handleChange} type="text" name="name" placeholder="Name"/>
        <TextInputComponent onChange={handleChange} type="date" name="date" placeholder="Date" />
        <TextInputComponent onChange={handleChange} type="text" name="car_plate" placeholder="Car plate"/>
        <TextInputComponent onChange={handleChange} type="time" name="time" placeholder="Time" />
      </div>
      <div className="button-container">
        <ButtonComponent onClick={checkIn}>Check In</ButtonComponent>
      </div>
      <p className="warning-text">{warningText}</p>
    </div>
  </Fragment>
)}

export default User;
