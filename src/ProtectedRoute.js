import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({isAuth, component:Component,userid,user, ...rest}) => {
   console.log(user)
    return (
        <Route 
        {...rest}
         component={(props)=>{
             if(isAuth){
                 return <Component {...props} userid={userid} user={user} />
             }
             else {
                 return <Redirect to={{pathname:"/", state:{from :props.location}}}  />
             }
         }}
        
        />
    )
}

export default ProtectedRoute
