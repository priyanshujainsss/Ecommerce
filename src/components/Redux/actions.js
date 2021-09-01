const isAuth=()=>({
    type:"ISAUTH"
})
const login=(data)=>({
    type:"LOGIN",
    payload:data
})
const logout=(data)=>({
    type:"LOGOUT",
    payload:data
})
const cartlength=(length)=>({
    type:"CARTLENGTH",
    payload:length
})
const actionuserid=(id)=>({
    type:"USERID",
    payload:id
})

export {isAuth,login,logout,cartlength,actionuserid}