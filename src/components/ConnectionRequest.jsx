import axios from "axios";
import { Base_url } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeConnection } from "../utils/connectionRequestSlice";

const ConnectionsRequests = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.request);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(Base_url + "/user/request/recieved", {
                withCredentials: true,
            });

            dispatch(addRequest(res.data.data)); // Store the fetched data
        } catch (e) {
            console.log(e.message);
        }
    };

    const reviewRequest= async(status ,_id)=>{
        try{
      const res = await axios.post(Base_url + "/request/review" +"/" + status + "/" +_id,
        {} , //when we are not send data it should be blank
        {withCredentials:true}
      )
      dispatch(removeConnection(_id))
}catch(e){
        console.log(e.message);
    }

    }

    useEffect(() => { 
        fetchRequests();
    }, []);

    // Properly handle missing/empty data
    if (!connections || connections.length === 0) return <h1 className="text-center my-10">No request found</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-2xl">Connections</h1>

            {connections.map((connection) => {
                const { _id, fromUserId, status } = connection;
                if (!fromUserId) return null; // Skip if user data is missing

                const { firstname, photoUrl } = fromUserId;

                return (
                    <div key={_id} className="p-4 border rounded-md shadow-md my-4">
                        <img 
                            src={photoUrl} 
                            alt="Profile Pic" 
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <div className="text-lg font-semibold">{firstname}</div>
                        <div className="text-gray-600">Status: {status}</div>

                        <div className="mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={()=>reviewRequest("accepted",connection._id)}>
                                Accept
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={()=>reviewRequest("Rejected",connection._id)}>
                                Decline
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ConnectionsRequests;
