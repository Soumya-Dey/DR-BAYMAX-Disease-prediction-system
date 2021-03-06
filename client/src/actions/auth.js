import axios from 'axios';

import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';

// for loading and authenticating user with token
export const loadUser = () => async (dispatch) => {
  // setting the token to the headers globally
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    // get the user data
    // don't need to pass the header
    // as the token is already in the header globally
    // returns user data -> name, email...
    const res = await axios.get('/auth');

    // send the user data to the reducer
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// for registering user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      // get the token after register
      // returns the token upon sucessfull authentication
      const res = await axios.post(
        '/register',
        JSON.stringify({ name, email, password }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      // send the token to the reducer
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // load user after registration
      dispatch(loadUser());
    } catch (error) {
      const errArr = error.response.data.errors;

      // send the errors to the alert reducer
      if (errArr) {
        errArr.forEach((errItem) => dispatch(setAlert(errItem.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAILURE,
      });
    }
  };

// for loggin in user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      // get the token after logging in
      // returns the token upon sucessfull authentication
      const res = await axios.post(
        '/login',
        JSON.stringify({ email, password }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      // send the token to the reducer
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // load the user after login
      dispatch(loadUser());
    } catch (error) {
      const errArr = error.response.data.errors;

      // send the errors to the alert reducer
      if (errArr) {
        errArr.forEach((errItem) => dispatch(setAlert(errItem.msg, 'danger')));
      }

      dispatch({
        type: LOGIN_FAILURE,
      });
    }
  };

// for loggin out user & clear profile
export const logout = () => (dispatch) => {
  //   dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
