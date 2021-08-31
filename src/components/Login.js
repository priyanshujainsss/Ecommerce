import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login } from "./Redux/actions";

function Login({ user }) {

  const dispatch = useDispatch()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [successmsg, setsuccessmsg] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      
      await auth.signInWithEmailAndPassword(email,password)
      seterrmsg("");
      setsuccessmsg("Successfull Login, Now, you are Redirecting to Home page");
      dispatch(login(true));
    //  dispatch(userData({"name":"user","age":"9080"}))
      // console.log(state);
      // console.log(disp)
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
    <div className="center container" style={{ maxWidth: "500px", marginTop: "130px" }}>
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
