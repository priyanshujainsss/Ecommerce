import { combineReducers } from "redux";
import {isAuthReducer } from './Reducer';

const rootReducer=combineReducers({isAuthReducer});
export default rootReducer;