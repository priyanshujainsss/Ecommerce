export const initialState=false;
export const isAuthReducer=(state=initialState, action)=>{
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
