import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get here!');
  }
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({ type: 'SEND' });
    fetch(`${process.env.REACT_APP_BACKEND}/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      header: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient },
        });
        dispatchHttp({ type: 'RESPONSE' });
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', error: error.message });
      });
  }, []);

  const setIngredientsHandler = useCallback(
    ing => dispatch({ type: 'SET', ingredients: ing }),
    []
  );

  const onRemoveItemHandler = useCallback(id => {
    dispatchHttp({ type: 'SEND' });
    fetch(`${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`, {
      method: 'DELETE',
    })
      .then(response => {
        dispatch({ type: 'DELETE', id });
        dispatchHttp({ type: 'RESPONSE' });
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', error: error.message });
      });
  }, []);

  const clearError = useCallback(
    () => dispatchHttp({ type: 'CLEAR', error: null }),
    []
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={onRemoveItemHandler}
      />
    );
  }, [userIngredients, onRemoveItemHandler]);

  return (
    <div className='App'>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search setIngredients={setIngredientsHandler} />
        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
