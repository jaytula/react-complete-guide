import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('Rendering Ingredients', ingredients);
  }, [ingredients]);

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
        setIngredients(prevState => [
          ...prevState,
          { id: responseData.name, ...ingredient },
        ]);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const setIngredientsHandler = useCallback(ing => setIngredients(ing), []);

  const onRemoveItemHandler = id => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`, {
      method: 'DELETE',
    })
      .then(response => {
        setIngredients(prevState => prevState.filter(ing => ing.id !== id));
        setIsLoading(false)
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
          ingredients={ingredients}
          onRemoveItem={onRemoveItemHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
