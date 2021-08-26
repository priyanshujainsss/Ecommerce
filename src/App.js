import React, { useEffect, useState, createContext, useReducer } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
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
import { isAuth } from "./components/Redux/actions";
import { isAuthReducer, initialState } from "./components/Redux/Reducer";
import { store } from "./components/Redux/store";
import Signup from "./components/Signup";
import ProtectedRoute from "./ProtectedRoute";
import UserContext from "./UserContext";

const App = () => {
  const [state, dispatch] = useReducer(isAuthReducer, initialState);
  const [user, setuser] = useState(null);
  console.log(state);
  // const [isAuth, setisAuth] = useState(false);
  const [userid, setuserid] = useState(null);
  const [useremail, setuseremail] = useState(null);
  const [shownav, setshownav] = useState(false)
  const history = useHistory();
  const getuserState = async () => {
    try {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setuserid(user.uid);
              setuseremail(snapshot.data());
              setshownav(true)
              setuser(snapshot.data().FullName);
              localStorage.setItem("isAuth", true);
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
    // dispatch(isAuth())
    getuserState();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={useremail}>
        <Navbar user={user} show={shownav}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={() => <Login user={user} />} />
          <Route path="/signup" component={() => <Signup user={user} />} />
          {/* <Route path="/add-product" component={Addproduct} />    */}
          {/* <Route path="/cart" 
        component={()=><Cart userid={userid} />} 
        // render={()=>{
          //   return <Cart  userid={userid} />
          // }}
        /> */}

          <ProtectedRoute
            path="/cart"
            component={Cart}
            isAuth={localStorage.getItem("isAuth")}
            userid={userid}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isAuth={localStorage.getItem("isAuth")}
            user={useremail}
          />
          <ProtectedRoute
            path="/addproduct"
            component={Addproduct}
            isAuth={localStorage.getItem("isAuth")}
          />
          <ProtectedRoute
            path="/placeorder"
            component={PlaceOrder}
            isAuth={localStorage.getItem("isAuth")}
            userid={userid}
          />
          <ProtectedRoute
            path="/myorders/:id"
            component={Myorders}
            isAuth={localStorage.getItem("isAuth")}
            userid={userid}
          />
          <Route component={Notfound} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
