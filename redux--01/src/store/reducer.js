import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + (action.value ? action.value : 1),
      };
    case actionTypes.SUBTRACT:
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - (action.value ? action.value : 1),
      };
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: state.counter }),
      };

    case actionTypes.DELETE_RESULT:
      // const deleteResultUpdate = [...state.results];
      // const indexToDelete = deleteResultUpdate.findIndex(item => item.id===action.id);
      // deleteResultUpdate.splice(indexToDelete, 1);

      const deleteResultUpdate = state.results.filter(
        result => result.id !== action.id
      );
      return {
        ...state,
        results: deleteResultUpdate,
      };

    default:
      return state;
  }
};

export default reducer;
