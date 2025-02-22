import { Outlet } from "react-router-dom";
import NavBar from "./navBar"
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Base_url } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
const Body = ()=>{

    const dispatch = useDispatch();
    const  Navigate = useNavigate();
    const userData = useSelector((store)=>store.user)//when we login redux store will have data.
                                                     //baseon that if if there is no data in redux store then only useeffect call fetchuser.
                                 
    //we using the api for authorize the token for login user 
    const fetchUser = async ()=>{
      try{
         const res = await axios.get(Base_url + "/profile/view",{
           withCredentials : true

         });
         dispatch(addUser(res.data))

      }catch(e){
        if(e.status==401){
        Navigate("/Login")
    }
    console.log(e)
      }
    }

    useEffect(()=>{
        if(!userData){
        fetchUser();
        }
       },[]);


   
    return <div >
    <NavBar></NavBar> 
    <Outlet/>     
    <Footer></Footer>          
    
    </div>
}


export default Body;