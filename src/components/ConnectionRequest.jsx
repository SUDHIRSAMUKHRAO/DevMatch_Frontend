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

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                `${Base_url}/request/review/${status}/${_id}`,
                {}, // Empty body
                { withCredentials: true }
            );
            dispatch(removeConnection(_id));
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!connections || connections.length === 0) 
        return <h1 className="text-white text-center text-2xl my-10">No request found</h1>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 py-10">
            <h1 className="font-bold text-3xl text-white mb-6">Connection Requests</h1>

            <div className="w-full max-w-md">
                {connections.map((connection) => {
                    const { _id, fromUserId, status } = connection;
                    if (!fromUserId) return null;

                    const { firstname, photoUrl } = fromUserId;

                    return (
                        <div key={_id} className="bg-gray-800 text-white p-4 rounded-xl shadow-md my-3 w-full">
                            <div className="flex flex-col items-center">
                                <img
                                    src={photoUrl || "/default-profile.png"}
                                    alt="Profile Pic"
                                    className="w-20 h-20 rounded-full border border-gray-600"
                                />
                                <div className="text-lg font-medium mt-2">{firstname}</div>
                                <div className="text-gray-400 text-sm">Status: {status}</div>

                                <div className="mt-3 flex gap-3">
                                    <button 
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm transition duration-300"
                                        onClick={() => reviewRequest("accepted", _id)}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition duration-300"
                                        onClick={() => reviewRequest("Rejected", _id)}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ConnectionsRequests;
