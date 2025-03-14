import axios from "axios";
import { Base_url } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connection);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(Base_url + "/user/connection", {
                withCredentials: true,
            });

            dispatch(addConnection(res.data.data));
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;
    if (connections.length === 0) return <h1 className="text-white text-center text-2xl my-10">No Connection Found</h1>;

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="font-bold text-3xl text-white mb-6">Connections</h1>

            {/* Centered Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl justify-items-center">
                {connections.map((connection) => {
                    const { _id, firstname, lastName, photoUrl, age, gender, about } = connection;

                    return (
                        <div 
                            key={_id} 
                            className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-80"
                        >
                            <img 
                                src={photoUrl} 
                                alt="Profile Pic" 
                                className="w-24 h-24 rounded-full mx-auto border-2 border-gray-700"
                            />
                            <div className="text-xl font-semibold mt-3 text-center">{firstname} {lastName}</div>
                            <div className="text-gray-400 text-center">{age} years old, {gender}</div>
                            {about && <div className="text-gray-500 text-center mt-2">{about}</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Connections;
