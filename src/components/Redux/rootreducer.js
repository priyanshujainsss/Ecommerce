import { combineReducers } from "redux";
import {isAuthReducer,cartLengthReducer,userIdReducer } from './Reducer';

const rootReducer=combineReducers({isAuthReducer,cartLengthReducer,userIdReducer});
export default rootReducer;