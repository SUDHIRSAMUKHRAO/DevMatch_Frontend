import axios from "axios";
import { Base_url } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { motion } from "framer-motion";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connection);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(Base_url + "/user/connection", {
                    withCredentials: true,
                });
                dispatch(addConnection(res.data.data));
            } catch (e) {
                console.error("Error fetching connections:", e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, [dispatch]);

    if (loading) return <h1 className="text-white text-center text-2xl my-10">Loading connections...</h1>;
    if (!connections || connections.length === 0) return <h1 className="text-white text-center text-2xl my-10">No Connection Found</h1>;

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="font-bold text-3xl text-white mb-6">Connections</h1>

            {/* Grid Layout */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl justify-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {connections.map(({ _id, firstname, lastName, photoUrl, age, gender, about }) => (
                    <motion.div
                        key={_id}
                        className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-80"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <img 
                            src={photoUrl || "/default-profile.png"} 
                            alt="Profile Pic" 
                            className="w-24 h-24 rounded-full mx-auto border-2 border-gray-700"
                        />
                        <div className="text-xl font-semibold mt-3 text-center">{firstname} {lastName}</div>
                        <div className="text-gray-400 text-center">{age} years old, {gender}</div>
                        {about && <div className="text-gray-500 text-center mt-2">{about}</div>}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Connections;
