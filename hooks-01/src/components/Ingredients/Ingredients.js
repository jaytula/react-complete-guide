import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/ingredients.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        const ings = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setIngredients(ings);
      });
  }, []);

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

  const onRemoveItemHandler = id => {
    setIngredients(prevState => prevState.filter(ing => ing.id !== id));
  };
  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
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
