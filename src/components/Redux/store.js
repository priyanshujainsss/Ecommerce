import { combineReducers, createStore } from "redux";
import { isAuthReducer } from "./Reducer";

const Reducer=combineReducers({
    isAuthReducer:isAuthReducer
})

export const store=createStore(Reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())