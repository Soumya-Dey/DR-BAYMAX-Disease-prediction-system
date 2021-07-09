import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

// adding the state variables
export default combineReducers({ alert, auth });
