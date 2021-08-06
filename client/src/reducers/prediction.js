import {
  GET_PREDICTION,
  GET_ALL_PREDICTIONS,
  PREDICTION_ERROR,
  CLEAR_PREDICTION,
  START_LOADING,
} from '../actions/types';

const initialState = {
  loading: true,
  prediction: null,
  predictions: null,
  newPrediction: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    // making a prediction
    case GET_PREDICTION:
      return {
        ...state,
        loading: false,
        newPrediction: true,
        prediction: action.payload,
      };
    // getting all the prediction of the user
    case GET_ALL_PREDICTIONS:
      return {
        ...state,
        loading: false,
        newPrediction: false,
        predictions: action.payload,
      };
    // fail when making a prediction
    case CLEAR_PREDICTION:
      return {
        ...state,
        loading: false,
        newPrediction: false,
        prediction: null,
      };
    case PREDICTION_ERROR:
      return {
        ...state,
        loading: false,
        newPrediction: false,
        prediction: null,
        error: action.payload,
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
