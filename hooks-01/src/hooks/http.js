import { useReducer, useCallback } from 'react';

// `${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`
const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...httpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const sendRequest = useCallback((url, method, body, extra, identifier) => {
    dispatchHttp({ type: 'SEND', identifier });
    fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log({ responseData });
        dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra });
        // dispatch({ type: 'DELETE', id });
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', error: error.message });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    extra: httpState.extra,
    identifier: httpState.identifier,
    clear
  };
};

export default useHttp;
