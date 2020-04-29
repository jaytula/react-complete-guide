import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return state.concat({ id: new Date(), value: action.result });

    case actionTypes.DELETE_RESULT:
      // const deleteResultUpdate = [...state.results];
      // const indexToDelete = deleteResultUpdate.findIndex(item => item.id===action.id);
      // deleteResultUpdate.splice(indexToDelete, 1);

      const deleteResultUpdate = state.filter(
        result => result.id !== action.id
      );
      return deleteResultUpdate;

    default:
      return state;
  }
};

export default reducer;
