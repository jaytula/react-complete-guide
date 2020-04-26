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

    default:
      return state;
  }
};

export default reducer;
