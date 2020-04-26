import * as actionTypes from './actions';

const initialState = [];

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      return state.concat(action.payload);
    case actionTypes.REMOvE_PERSON:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};

export default reducers;