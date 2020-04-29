import * as actionTypes from '../actions/actionTypes';

const initialState = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
    case actionTypes.INCREMENT:
      return  state + (action.value ? action.value : 1);
    case actionTypes.SUBTRACT:
    case actionTypes.DECREMENT:
      return state - (action.value ? action.value : 1);
    default:
      return state;
  }
};

export default reducer;
