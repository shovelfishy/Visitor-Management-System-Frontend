import "./Visitor.css"
import api from "../api/axiosConfig.tsx"
import {useState} from 'react'

function Visitor( id ) {

    const [visitor, setVisitor] = useState();

    const getVisitor = async () => {
        try {
            const res = await api.get("/visitor",
            {  
                headers: {
                    "id": id,
                }
            })
            // console.log(res.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    getVisitor()
    return (
    <>
        <div className="visitor-entry">
            <h1>VISITOR ENTRY</h1>
            <div className="visitor">
                <p>Name: </p>
                <p>Car Plate: </p>
                <p>Date: </p>
                <p>Time: </p>
                <p>Status: </p>
            </div>
        </div>
    </>
    )
}

export default Visitor