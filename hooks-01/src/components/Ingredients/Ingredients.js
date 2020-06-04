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
  const { isLoading, data, error, sendRequest, extra, identifier } = useHttp();

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients);
  }, [userIngredients]);

  useEffect(() => {
    if (isLoading || error) return;
    switch (identifier) {
      case 'REMOVE_INGREDIENT':
        dispatch({ type: 'DELETE', id: extra });
        break;
      case 'ADD_INGREDIENT':
        console.log({ data });
        dispatch({
          type: 'ADD',
          ingredient: { id: data.name, ...extra },
        });
        break;
      default:
        break;
    }
  }, [data, isLoading, extra, identifier, error]);

  const addIngredientHandler = useCallback(
    ingredient => {
      sendRequest(
        `${process.env.REACT_APP_BACKEND}/ingredients.json`,
        'POST',
        JSON.stringify(ingredient),
        ingredient,
        'ADD_INGREDIENT'
      );
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
    },
    [sendRequest]
  );

  const setIngredientsHandler = useCallback(ing => {
    dispatch({ type: 'SET', ingredients: ing });
  }, []);

  const onRemoveItemHandler = useCallback(
    id => {
      sendRequest(
        `${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`,
        'DELETE',
        null,
        id,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

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
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
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
