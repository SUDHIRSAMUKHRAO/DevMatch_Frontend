import axios from "axios";
import { Base_url } from "../utils/constant";
import { useDispatch } from "react-redux";

import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user}) =>{
  console.log(user)
const {_id,firstname, lastName,age,gender,photoUrl,skills,about} =  user;
const dispatch = useDispatch()

const handleSendRequest = async (status,userId) =>{
  try{
    await axios.post(Base_url + "/request/send/" + status + "/" + userId,{},
      {withCredentials: true});
     dispatch(removeUserFromFeed(userId));
  }catch(e){
    console.log(e.message);
  }
 
}


return <div><div className="card bg-base-300 w-96 shadow-xl"> 
<figure>
  <img  
    src={photoUrl} alt="photo" />
</figure>
<div className="card-body">
  <h2 className="card-title">{firstname +   " "   +lastName} </h2>
  {age && gender  && <p>{age + " , " + gender} </p>}
  <p>{about }</p>
  <div className="card-actions justify-center my-4">
    <button className="btn  btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
    <button className="btn btn-secondary"onClick={()=>handleSendRequest("intrested",_id)}>Interested</button>
  </div>
</div>
</div></div>

  
}   

export default UserCard;