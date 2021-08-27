export const isAuth=()=>({
    type:"ISAUTH"
})
export const login=(data)=>({
    type:"LOGIN",
    payload:data
})
export const logout=(data)=>({
    type:"LOGOUT",
    payload:data
})
