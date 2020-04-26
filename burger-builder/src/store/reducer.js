import * as actionTypes from './actions';

const initialState = { ingredients: null, totalPrice: 4 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      break;
    case actionTypes.REMOVE_INGREDIENT:
      break;
    default:
      return state;
  }
};

export default reducer;
