import {BrowserRouter, Routes,Route} from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appstore from "./utils/appstore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import ConnectionsRequests from "./components/connectionRequest";
function App() {

  return (


    <>
    <Provider store={appstore}>
   <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />} >
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/Requests" element={<ConnectionsRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>



  )
}

export default App
 
 
 