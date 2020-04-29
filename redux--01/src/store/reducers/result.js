import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(state, {
        results: state.results.concat({ id: new Date(), value: action.result }),
      });

    case actionTypes.DELETE_RESULT:
      // const deleteResultUpdate = [...state.results];
      // const indexToDelete = deleteResultUpdate.findIndex(item => item.id===action.id);
      // deleteResultUpdate.splice(indexToDelete, 1);

      const deleteResultUpdate = state.results.filter(
        result => result.id !== action.id
      );
      return updateObject(state, { results: deleteResultUpdate });

    default:
      return state;
  }
};

export default reducer;
