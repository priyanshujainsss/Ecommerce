import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, fs } from "./firebase";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login } from "./Redux/actions";
import "./Login.css";
function Login({ user }) {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errmsg, seterrmsg] = useState("");
  var x,y;
  const closeeye=()=> {
    console.log("close eye called")
    x = document.getElementById("hands");
    y = document.getElementById("animcon");
    y.style.backgroundImage =
      "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey_pwd.gif)";
    x.style.marginTop = "0%";
  }
const  openeye=()=> {
    console.log("open eye called")
    x = document.getElementById("hands");
    y = document.getElementById("animcon");
    y.style.backgroundImage =
      "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey.gif)";
    x.style.marginTop = "110%";
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      console.log(user.user.uid);
      await fs.collection("users").doc(user.user.uid).update({
        password: password,
      });
      seterrmsg("");
    
      dispatch(login(true));
    } catch (err) {
      seterrmsg("Invalid Details");
      console.log("err", err);
    }
  };
  console.log("login called");

  if (user) {
    return <Redirect to="/" />;
  }

  return (

        /*  Simple Login page ui */

    //   <div className="center container" style={{ maxWidth: "500px", marginTop: "130px" }}>
    //     <h4>Login</h4>
    //     {successmsg &&
    //     <div style={{ top:"45%",left:"45%",overflow:"visible",position:"fixed",backfaceVisibility:"hidden"
    //     } } ><Loader
    //       type="Grid"
    //       color="#00BFFF"
    //       height={100}
    //       width={100}

    //     />
    //     </div>

    //     }
    //     {errmsg && <div> {errmsg} </div>  }
    //     <form className="input-field" onSubmit={handleLogin}>
    //       <input
    //         placeholder="Email"
    //         type="email"
    //         value={email}
    //         onclick={()=>openeye()}
    //         onChange={(e) => setemail(e.target.value)}
    //       />
    //       <input
    //         placeholder="Password"
    //         type="password"
    //         value={password}
    //         onclick={()=>closeeye()}

    //         onChange={(e) => setpassword(e.target.value)}
    //       />
    //       <button className="waves-effect waves-light btn" type="submit">
    //         Login
    //       </button>
    //     </form>
    //      <h6><Link to="/forgotPassword" >Forgot Password</Link></h6>
    //     <h5>Don't Have an Account Signup <Link to="/signup"><span>Here</span></Link></h5>
    //   </div>

    /*  Monkey Login Page Ui */
   
    <div class="maincontainer">
      <div class="monkeylogin">
        <div class="animcon" id="animcon">
          <img
            id="hands"
            src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png"
            alt="monkey hands"
          />
        </div>
        <div class="formcon">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              id="input"
              name=""
              onClick={()=>openeye()}
              class="tb"
              placeholder="Email"
              onFocus={openeye}
             onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <br />
            <input
              type="password"
              id="input"
        
              onFocus={closeeye}
              name="pwd"
              class="tb"
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <br />
            <br />
         {errmsg && <div style={{display:"flex", justifyContent:"center", color:'red', marginTop:"-20px"}}> {errmsg} </div>  }
            <input type="submit" name="" class="sbutton" id="input" value="L O G I N" />
          </form>
        </div>
        <h6><Link to="/forgotPassword" >Forgot Password</Link></h6>
       <h5>Don't Have an Account Signup <Link to="/signup"><span>Here</span></Link></h5>
      </div>
    </div>
  );
}

export default Login;
