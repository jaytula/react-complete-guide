import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setIngredients(prevState => [
      ...prevState,
      { id: Math.random().toString(), ...ingredient },
    ]);
  };

  const onRemoveItemHandler = (id) => {
    setIngredients(prevState => prevState.filter(ing => ing.id !== id))
  }
  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItemHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
