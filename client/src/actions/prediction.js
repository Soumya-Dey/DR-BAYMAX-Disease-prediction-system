import axios from 'axios';

import { setAlert } from './alert';
import { GET_PREDICTION, GET_ALL_PREDICTIONS, PREDICTION_ERROR } from './types';

// for getting all the predictions made by an user
export const getAllPredictions = () => async (dispatch) => {
  try {
    const res = await axios.get('/report');

    dispatch({
      type: GET_ALL_PREDICTIONS,
      payload: res.data,
    });
  } catch (error) {
    // validation errors
    const errArr = error.response.data.errors;

    // send the errors to the alert reducer
    if (errArr) {
      errArr.forEach((errItem) => dispatch(setAlert(errItem.msg, 'danger')));
    }

    dispatch({
      type: PREDICTION_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
