const initialState = {
  counter: 0,
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + (action.value ? action.value : 1),
      };
    case 'SUBTRACT':
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - (action.value ? action.value : 1),
      };
    case 'STORE_RESULT':
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: state.counter}),
      };
      
    case 'DELETE_RESULT':
      // const deleteResultUpdate = [...state.results];
      // const indexToDelete = deleteResultUpdate.findIndex(item => item.id===action.id);
      // deleteResultUpdate.splice(indexToDelete, 1);

      const deleteResultUpdate = state.results.filter(result => result.id !== action.id)
      return {
        ...state,
        results: deleteResultUpdate
      }

    default:
      return state;
  }
};

export default reducer;
