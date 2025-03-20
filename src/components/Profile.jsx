import EditProfile from "./Editprofile";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { Base_url } from "../utils/constant";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user); // Get user from Redux

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${Base_url} + "/profile/view" `, { withCredentials: true });
      dispatch(addUser(res?.data?.data)); // Store user in Redux
    } catch (e) {
      console.log("Error fetching user:", e.message);
    }
  };

  useEffect(() => {
    fetchUser(); // Always fetch user data on mount
  }, []); // No dependency means it runs only once per mount

  if (!user) return <div>Loading...</div>; // Show loading until data is fetched

  return <div><EditProfile user={user} /></div>;
};

export default Profile;
