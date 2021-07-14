import {
  GET_PREDICTION,
  GET_ALL_PREDICTIONS,
  PREDICTION_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
  prediction: null,
  predictions: null,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    // making a prediction
    case GET_PREDICTION:
      return {
        ...state,
        loading: false,
        prediction: action.payload,
      };
    // getting all the prediction of the user
    case GET_ALL_PREDICTIONS:
      return {
        ...state,
        loading: false,
        predictions: action.payload,
      };
    // fail when making a prediction
    case PREDICTION_ERROR:
      return {
        ...state,
        loading: false,
        prediction: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
