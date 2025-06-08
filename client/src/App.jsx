import { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductDescription from "./pages/ProductDescription";
import Signup from "./pages/Signup";
import Favorite from "./pages/Favorite";
import {Toaster} from "react-hot-toast"
import {useDispatch} from "react-redux";
import { userExists } from "./redux/reducers/auth";
import NotFoundPage from "./components/NotFound";
import axios from "axios";
import { getUser_api } from "./utils/api";


const App = () => {


  const dispatch = useDispatch();


  const fetchUserDetails = useCallback(async () => {

    try {
      const current_user = await axios.get(getUser_api, { withCredentials: true });

      if (current_user?.data?.success) {
        dispatch(userExists(current_user?.data?.data));
      }
      return;

    } catch (error) {
      console.log(error);
    }
  },[dispatch]);


  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/description/:id" element={<ProductDescription />} />
        <Route path="/favorites" element={<Favorite/>} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes> 
      <Toaster position="top-right"/>
    </Router>
  )
}

export default App;