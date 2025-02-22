import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../utils/constant";





const Login = () => {
     const [emailId, setEmailId] = useState("sudhir123@gmail.com");
     const [password, setPassword] = useState("sudhir@123");
     const disPatch = useDispatch();
     const naviagte = useNavigate();
 

   const  handelLogin = async() => {
     try {
        const response = await axios.post(Base_url +"/login", 
       {emailId: emailId, password: password},
        {withCredentials: true});
        console.log(response );

        disPatch(addUser(response.data));
        return naviagte("/")
 
     } catch (error) {
        console.error(error);
     }

   }



     return <div className="flex justify-center my-10">
          <div className="card bg-base-300 w-96 shadow-xl ">
               <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div><label className="form-control w-full max-w-xs my-2">
                         <div className="label">
                              <span className="label-text">Email ID</span>
                         </div>
                         <input type="text" value={emailId} className="input input-bordered w-full max-w-xs"
                         onChange={(e) => setEmailId(e.target.value)} />

                    </label>
                         <label className="form-control w-full max-w-xs my-2"> 
                              <div className="label">
                                   <span className="label-text">Password</span>
                              </div>
                              <input type="text" value={password} className="input input-bordered w-full max-w-xs" 
                              onChange={(e)=>setPassword(e.target.value)}/>
                         </label></div>


                    <div className="card-actions justify-center">
                         <button className="btn btn-primary "onClick={handelLogin}>Login</button>
                    </div>
               </div>
          </div>
     </div>

}

export default Login;