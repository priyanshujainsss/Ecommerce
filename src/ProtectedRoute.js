import React, {useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { auth } from './components/firebase'
import { login } from './components/Redux/actions'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ProtectedRoute = ({isAuth, component:Component,userid,user, ...rest}) => {
    const [wait, setwait] = useState(true)
    const dispatch = useDispatch()
   const getuserState=()=>{
       auth.onAuthStateChanged(function(user){
           if(user){
               dispatch(login(true))
           }
           setwait(false)
       })
   }
   useEffect(() => {
      getuserState();
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
    if(wait){
        return <div style={{ top:"47%",left:"46%",overflow:"visible",position:"fixed",backfaceVisibility:"hidden"
    } } ><Loader 
      type="Grid"
      color="#00BFFF"
      height={100}
      width={100}

    />
    </div>
    }
    return (
        <Route 
        {...rest}
         component={(props)=>{
             console.log(props)
             if(isAuth){
                 console.log("if called")
                 return <Component {...props} userid={userid} user={user} />
             }
             else {
                 console.log("else called",props.location)
                 return <Redirect to={{pathname:"/", state:{from :props.location}}}  />
             }
         }}
        
        />
    )
}

export default ProtectedRoute
