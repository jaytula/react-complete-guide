import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ setIngredients }) => {
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch(`${process.env.REACT_APP_BACKEND}/ingredients.json` + query, {
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
  }, [enteredFilter, setIngredients]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            type='text'
            value={enteredFilter}
            onChange={e => setEnteredFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
