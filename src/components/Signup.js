import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { auth,fs } from './firebase';
const Signup = ({user}) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [fname,setfname]=useState("")
    const [successmsg, setsuccessmsg] = useState(null);
    const [errmsg, seterrmsg] = useState(null)
    const history=useHistory();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await auth.createUserWithEmailAndPassword(email,password)
             await fs.collection("users").doc(response.user.uid).set({
                Id:response.user.uid,
                FullName:fname,
                Email:email,
                password:password
             })
             seterrmsg("")
             setsuccessmsg("Successfull Signup, Now you are redirecting to login page");
             setTimeout(()=>{

                 history.push("/login")
             },3000)
        }
        catch(err){
            setsuccessmsg("");
            seterrmsg(err.message)

        }
    }
    if(user){
        // console.log(user)
        return <Redirect to="/" />
    }

    return (
        <div className="center container" style={{ maxWidth: "500px", marginTop: "130px" }}  >
        <h4>Signup</h4>    
        {successmsg && <div>{successmsg}</div>}
        {errmsg && <div>{errmsg}</div>}
        <form className="input-field" onSubmit={handleSubmit} >
           <input placeholder="full name" type="text" cvalue={fname} onChange={(e)=>setfname(e.target.value)} />
           <input placeholder="Email" type="email"  value={email} onChange={e=>setemail(e.target.value)}/>
          <input placeholder="Password"  type="password" value={password} onChange={(e=>setpassword(e.target.value))} />
          <button className="waves-effect waves-light btn" >Signup</button>
           </form>
           <h5>Already Have an Account Login <span><Link to="/login" >Here</Link></span></h5>
          
       
       
       </div>
    )
}

export default Signup
