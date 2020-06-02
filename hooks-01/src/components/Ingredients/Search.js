import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ setIngredients }) => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current.value !== enteredFilter) return;
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
          if(!data) return;
          const ings = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
          }));
          setIngredients(ings);
        });
      return () => {
        clearTimeout(timer);
      };
    }, 500);
  }, [enteredFilter, setIngredients, inputRef]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            ref={inputRef}
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
