import axios from "axios";
import { Base_url } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connection);
    // Get data from Redux store

    const fetchConnections = async () => {
        try {
            const res = await axios.get(Base_url + "/user/connection", {
                withCredentials: true,
            });

            dispatch(addConnection(res.data.data)); // Store the fetched data
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);
  if(!connections) return; //  
  if(connections.length===0)return <h1>No connection Found</h1>  
    return(
        <div className="text-center my-10">
        <h1 className="font-bold text-2xl">Connections</h1>
    
        {connections.map((connection) => {
            const { _id, firstname, lastName, photoUrl, age, gender, about } = connection;
    
            return (
                <div key={_id} className="p-4 border rounded-md shadow-md my-4">
                    <img 
                        src={photoUrl} 
                        alt="Profile Pic" 
                        className="w-24 h-24 rounded-full mx-auto"
                    />
                    <div className="text-lg  -semibold">{firstname} {lastName}</div>
                    <div className="text-gray-600">{age} years old, {gender}</div>
                    {about && <div className="text-gray-500">{about}</div>}
                    {/* {skills && <div className="text-gray-500">{skills[0]}</div>} */}
    
                    {/* <div className="mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                            Accept
                        </button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                            Decline
                        </button>
                    </div> */}
                </div>
            ); 
        })}
    </div>
    
    )

    
}

export default Connections;
