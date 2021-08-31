import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from './UserContext'
const ProtectedRoute = ({isAuth, component:Component,userid,user, ...rest}) => {
    const context = useContext(UserContext)
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
