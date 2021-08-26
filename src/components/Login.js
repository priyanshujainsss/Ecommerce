import React, { useState, useReducer } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { login } from "./Redux/actions";
import { isAuthReducer, initialState } from "./Redux/Reducer";

function Login({ user }) {
  const [state, dispatch] = useReducer(isAuthReducer,initialState)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [successmsg, setsuccessmsg] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const history = useHistory();
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      
      const response=await auth.signInWithEmailAndPassword(email,password)
      seterrmsg("");
      setsuccessmsg("Successfull Login, Now, you are Redirecting to Home page");
      await dispatch(login(true))
      console.log(state);
      // setTimeout(()=>{
      //   history.push("/")
      // },1500)
    }
    catch(err){
      setsuccessmsg("");
      seterrmsg(err.message);
      console.log("err",err)
    }

  }
  console.log("login called")


if(user){
  return <Redirect to="/" />
}

  return (
    <div className="center container" style={{ maxWidth: "500px", marginTop: "70px" }}>
      <h4>Login</h4>
      {successmsg &&
      <div style={{ top:"45%",left:"45%",overflow:"visible",position:"fixed",backfaceVisibility:"hidden"
      } } ><Loader 
        type="Grid"
        color="#00BFFF"
        height={100}
        width={100}

      />
      </div>
    
      }
      {errmsg && <div> {errmsg} </div>  }
      <form className="input-field" onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="waves-effect waves-light btn" type="submit">
          Login
        </button>
      </form>
      <h5>Don't Have an Account Signup <Link to="/signup"><span>Here</span></Link></h5>

    </div>
  );
}

export default Login;
