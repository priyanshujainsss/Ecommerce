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
import Home from "./components/Home";
import Login from "./components/Login";
import Myorders from "./components/Myorders";
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import PlaceOrder from "./components/PlaceOrder";
import Profile from "./components/Profile";
import {login } from "./components/Redux/actions";
import Signup from "./components/Signup";
import ProtectedRoute from "./ProtectedRoute";
import UserContext from "./UserContext";
const App = () => {
  const isauth = useSelector(state => state.isAuthReducer)
  const  dispatch = useDispatch();
  const [user, setuser] = useState(null);
   const [userid, setuserid] = useState(null);
  const [useremail, setuseremail] = useState(null);
  const [shownav, setshownav] = useState(false);
  
  const getuserState = async () => {
    try {
     auth.onAuthStateChanged(function (user) {
        if (user) {
          dispatch(login(true))
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setuserid(user.uid);
              setuseremail(snapshot.data());
              setshownav(true);
              setuser(snapshot.data());
              console.log("appjs")
    
            })
            .catch((err) => {
              console.log("unable to retrieve", err);
            });
        } else {
          setuser(null);
        }
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user)
  useEffect(() => {
    getuserState();

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <BrowserRouter>
    {
      console.log(isauth)
    }
      <UserContext.Provider value={useremail}>
        <Navbar user={user} show={shownav}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={() => <Login user={user} />} />
          <Route exact path="/signup" component={() => <Signup user={user} />} />
         {/* <Route exact path="/cart" component={()=><Cart userid={userid} />} /> */}
       
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
            user={useremail}
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
