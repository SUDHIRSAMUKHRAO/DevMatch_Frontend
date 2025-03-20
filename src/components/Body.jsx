import { Outlet } from "react-router-dom";
import NavBar from "./navBar"; // Ensure correct casing
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Base_url } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user); // Redux user state

  // Fetch user if not already in Redux store
  const fetchUser = async () => {
    try {
      if (userData) return; // Avoid unnecessary API calls

      const res = await axios.get(Base_url + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");
      }
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userData]); // Depend on userData

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
