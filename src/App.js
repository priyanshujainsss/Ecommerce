import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useDispatch } from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Addproduct from "./components/addproduct";
import Cart from "./components/Cart";
import { auth, fs } from "./components/firebase";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Myorders from "./components/Myorders";
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import PlaceOrder from "./components/PlaceOrder";
import Profile from "./components/Profile";
import {cartlength, login,actionuserid } from "./components/Redux/actions";
import Signup from "./components/Signup";
import ProtectedRoute from "./ProtectedRoute";
import UserContext from "./UserContext";
const App = () => {
  const isauth = useSelector(state => state.isAuthReducer);
  const storeuserid=useSelector(state=>state.userIdReducer);
  const  dispatch = useDispatch();
   const [userid, setuserid] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  const [shownav, setshownav] = useState(false);
  
  const getuserState = async () => {
    try {
     auth.onAuthStateChanged(function (user) {
        if (user) {
          console.log(user)
          dispatch(actionuserid(user.uid));
          dispatch(login(true))
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              console.log(snapshot.data())
              setuserid(user.uid);
              setuserDetails(snapshot.data());
              setshownav(true);
              console.log("appjs")
            })
            .catch((err) => {
              console.log("unable to retrieve", err);
            });
            getCartLength();

        } else {
          setuserDetails(null)
        }
      });
      return userDetails;
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user)
 const getCartLength=async()=>{
   try{
     console.log("storeuserid",storeuserid)
     const totallength=await fs.collection(`Cart ${storeuserid.id}`).get();
     dispatch(cartlength(totallength.docs.length));
    }
    catch(err){
      console.log("failed to get length",err)
    }
  }


  useEffect(() => {
    getuserState();
    // getCartLength(); 
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <BrowserRouter>
    {/* {
      console.log(isauth)
    } */}
      <UserContext.Provider value={userDetails}>
        {/* {
        console.log("userid",userid),
        console.log("userDetails",userDetails)
        } */}
        <Navbar user={userDetails} show={shownav}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={() => <Login user={userDetails} />} />
          <Route exact path="/signup" component={() => <Signup user={userDetails} />} />
         <Route exact path="/forgotPassword" component={()=> <ForgotPassword user={userDetails} />} />
       
          <ProtectedRoute
            path="/cart"
            component={Cart}
            // isAuth={user}
            isAuth={isauth}
            userid={userid}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            // isAuth={user}
            isAuth={isauth}
            user={userDetails}
          />
          <ProtectedRoute
            path="/addproduct"
            component={Addproduct}
            isAuth={isauth}
            // isAuth={user}
          />
          <ProtectedRoute
             path="/placeorder"
            component={PlaceOrder}
            isAuth={isauth}
            // isAuth={user}
            userid={userid}
          />
          <ProtectedRoute
            path="/myorders/:id"
            component={Myorders}
            isAuth={isauth}
            // isAuth={user}
            userid={userid}
          />
          <Route component={Notfound} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
