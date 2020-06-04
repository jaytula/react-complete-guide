import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

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

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, data, error, sendRequest } = useHttp();

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = useCallback(ingredient => {
    // dispatchHttp({ type: 'SEND' });
    // fetch(`${process.env.REACT_APP_BACKEND}/ingredients.json`, {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   header: { 'Content-Type': 'application/json' },
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(responseData => {
    //     dispatch({
    //       type: 'ADD',
    //       ingredient: { id: responseData.name, ...ingredient },
    //     });
    //     dispatchHttp({ type: 'RESPONSE' });
    //   })
    //   .catch(error => {
    //     dispatchHttp({ type: 'ERROR', error: error.message });
    //   });
  }, []);

  const setIngredientsHandler = useCallback(ing => {
    dispatch({ type: 'SET', ingredients: ing });
  }, []);

  const onRemoveItemHandler = useCallback(id => {
    sendRequest(`${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`, 'DELETE')
  }, [sendRequest]);

  const clearError = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR', error: null });
  }, []);

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
      {error && (
        <ErrorModal onClose={clearError}>{error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
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
