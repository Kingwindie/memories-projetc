//this file has the purpose of grouping all our reducers into this one file,
//combining all of them in this file makes it easier to access from diff
//components that will need them 

import { combineReducers } from "redux";
import posts from './posts'; 




export default combineReducers({
   posts
})