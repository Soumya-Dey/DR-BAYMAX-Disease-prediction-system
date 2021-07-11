import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import prediction from './prediction';

// adding the state variables
export default combineReducers({ alert, auth, prediction });
