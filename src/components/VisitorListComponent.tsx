import api from '../api/axiosConfig.tsx';
import {ReactNode, useEffect, useState} from 'react';
import './stylesheets/VisitorListComponent.css';
import Visitor from '../pages/Visitor.tsx';

interface props {
    buttonClicked: ReactNode,
    ownerID: string
}

function VisitorListComponent( {buttonClicked, ownerID}: props ) {
  // console.log(ownerID)
  const [visitorData, setVisitorData]: any[] = useState([])

  const getVisitors = async () => {
    try {
      const res = await api.get("/"+ownerID)
      console.log([...res['data']])
      return [...res['data']]
    } catch (error) {
      console.log(error)
    }
  }

  Visitor("64cde0f4fc0a401024de443d")

  useEffect(() => {
    async function fetchData(){
      const data = await getVisitors();
      setVisitorData(data)
    }
    fetchData()
  },[buttonClicked])

  function datas(name, car_plate, date, id){

    const visitor = (id) => {
      
    }

    return (
      <div className='visitor' onClick={visitor}>
        <h2>{name}</h2>
        <p>{car_plate}</p>
        <p>{date}</p>
        <p>status</p>
      </div>
    )
  }

function alldata(){
  try {
    const visitors = visitorData.map(item => 
      datas(item.name, item.car_plate, item.date, item.id)
    )
    return visitors;
  } catch (error) {
    return null; 
  }
}

return (
    <>
      {alldata()}
    </>
  )
}

export default VisitorListComponent