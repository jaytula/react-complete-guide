import { useReducer, useCallback } from 'react';

// `${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null };
    case 'RESPONSE':
      return { ...httpState, loading: false, data: action.responseData };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: 'SEND' });
    fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        dispatchHttp({ type: 'RESPONSE', responseData: responseData });
        // dispatch({ type: 'DELETE', id });
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', error: error.message });
      });
  }, []);

  return { isLoading: httpState.loading, data: httpState.data, error: httpState.error, sendRequest }
};

export default useHttp;
