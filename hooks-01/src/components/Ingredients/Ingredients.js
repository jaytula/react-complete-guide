import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log('Rendering Ingredients', ingredients);
  }, [ingredients]);

  const addIngredientHandler = ingredient => {
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
      });
  };

  const setIngredientsHandler = useCallback(ing => setIngredients(ing), []);

  const onRemoveItemHandler = id => {
    fetch(`${process.env.REACT_APP_BACKEND}/ingredients/${id}.json`, {
      method: 'DELETE',
    })
      .then(response => {
        setIngredients(prevState => prevState.filter(ing => ing.id !== id));
      })
      .catch(error => {
        console.log(error);
      })
  };
  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

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
