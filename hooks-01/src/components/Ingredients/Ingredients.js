import React, { useReducer, useEffect, useCallback, useState } from 'react';

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
      return currentIngredients;
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const setIngredientsHandler = useCallback(ing => dispatch({type: 'SET', ingredients: ing}), []);

  const onRemoveItemHandler = id => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`, {
      method: 'DELETE',
    })
      .then(response => {
        dispatch({type: 'DELETE', id});
        setIsLoading(false);
      })
      .catch(error => {
        setError('Something went wrong');
        setIsLoading(false);
        console.log(error);
      });
  };

  const clearError = () => setError(null);

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

        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={onRemoveItemHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
