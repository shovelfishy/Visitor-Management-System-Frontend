import api from "../api/axiosConfig.tsx";
import { ReactNode, useEffect, useState } from "react";
import styles from "./stylesheets/VisitorListComponent.module.css";
import Visitor from "../pages/Visitor.tsx";
import { format } from "date-fns";

interface props {
  buttonClicked: ReactNode;
  residentID: string;
}

function VisitorListComponent({ buttonClicked, residentID }: props) {
  // console.log(ownerID)
  const [visitorData, setVisitorData]: any[] = useState([]);

  const getVisitors = async () => {
    try {
      const res = await api.get("/" + residentID);
      console.log(res["data"]);
      return res["data"];
    } catch (error) {
      console.log(error);
    }
  };

  Visitor("64cde0f4fc0a401024de443d");

  useEffect(() => {
    async function fetchData() {
      const data = await getVisitors();
      setVisitorData([...data]);
    }
    fetchData();
  }, [buttonClicked]);

  function datas(name, car_plate, date, status, id) {
    const visitor = (id) => {};
    let statusColor = "#F2A660";

    if (status == "Entered") {
      statusColor = "#41FF5F";
    } else if (status == "Cancelled") {
      statusColor = "#EE3000";
    }

    return (
      <div className={styles.visitor} onClick={visitor}>
        <h2>{name}</h2>
        <p>{car_plate}</p>
        <p>{format(date, "MMMM d, yyyy")}</p>
        <p style={{ color: statusColor }}>{status}</p>
      </div>
    );
  }

  function alldata() {
    try {
      const visitors = visitorData.map((item) =>
        datas(item.name, item.car_plate, item.date, item.status, item.id)
      );
      return visitors;
    } catch (error) {
      return null;
    }
  }

  return <>{alldata()}</>;
}

export default VisitorListComponent;
