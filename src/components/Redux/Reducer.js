export const initialState=false;
export const cartlengthstate=0;
export const useriddata={}
const isAuthReducer=(state=initialState, action)=>{
    switch(action.type){
        case "ISAUTH":
               return state;
        case "LOGIN":
              return state=action.payload;
        case "LOGOUT":
            return state=action.payload
        default:
            return state;    
    }
}
const cartLengthReducer=(state=cartlengthstate,action)=>{
switch(action.type){
    case "CARTLENGTH":
        state=action.payload
        return state;
    default:
        return state;    
}
}
const userIdReducer=(state=useriddata,action)=>{
    switch(action.type){
        case "USERID":
            //eslint-disable-next-line
            {
             state.id=action.payload
            }
            console.log(state)
            return state
        default:
            return state;
    }
}
export {isAuthReducer,cartLengthReducer,userIdReducer}