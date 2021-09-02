import React, { useState } from "react";
import {Redirect } from "react-router-dom";
import { auth } from "./firebase";


function ForgotPassword({ user }) {

  const [email, setemail] = useState("");
   const [succesModel, setsuccesModel] = useState(false)
  const handleReset=async(e)=>{
      e.preventDefault();
    try{
        const config={
            url:"http://localhost:3000/login",
            handleCodeInApp:true
        }
      await auth.sendPasswordResetEmail(email,config)
    }
    catch(err){
        console.log(err)
    }
    setsuccesModel(true)
}


if(user){
  return <Redirect to="/" />
}
  return (
    <div className="center container" style={{ maxWidth: "500px", marginTop: "130px" }}>
        {!succesModel &&<>
      <h4>Reset Password</h4>
      <form className="input-field" onSubmit={handleReset}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <button className="waves-effect waves-light btn" type="submit">
          Reset Password
        </button>
      </form>
      </>
}
{
    succesModel && <h4>A Reset Password Link has been sent.<br/>If User has registered with this <span style={{fontWeight:"bold"}} >{email}</span> email. </h4>
}

    </div>
  );
}

export default ForgotPassword;
