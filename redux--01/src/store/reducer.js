const initialState = {
  counter: 0,
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
      }
    
    default:
      return state;
  }
};

export default reducer;
