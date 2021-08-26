export let initialState=false;
export const isAuthReducer=(state=initialState, action)=>{
    switch(action.type){
        case "ISAUTH":
            console.log(state)
            return state;
        case "LOGIN":
            state=action.payload
            console.log(state,action.payload);
            return state=true;
        case "LOGOUT":
            console.log(action.payload)
            return state=action.payload        
        default:
            return state;    
    }
}