import axios from "axios";
import { Base_url } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";
import { useEffect } from "react";
import UserCard from  "./UserCard"





const Feed = ()=>{
   const feed = useSelector((store)=>store.feed);
   const dispatch  = useDispatch(); 

   const getFeed = async ()=>{
      if(feed) return;
    try{const res =  await axios.get(Base_url + "/feed",{withCredentials: true });
    dispatch(addFeed(res?.data?.data));
    }catch(e){
      console.log(e.message);
    }


   
   }
   useEffect(()=>{
      getFeed();
   },[]); 

   return (feed && (<div className="flex justify-center my-10" >
      <UserCard user={feed[0]}/>
   </div> )
)}





export default Feed;