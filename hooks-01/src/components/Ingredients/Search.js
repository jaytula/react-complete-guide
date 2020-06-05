import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(({ setIngredients }) => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const { data, error, isLoading, sendRequest, clear } = useHttp();
  const inputRef = useRef();

  useEffect(() => {
    if (!isLoading && data && !error) {
      console.log({ data });
      const ings = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      setIngredients(ings);
    }
  }, [data, isLoading, error, setIngredients]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current.value !== enteredFilter) return;
      const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`;
      sendRequest(
        `${process.env.REACT_APP_BACKEND}/ingredients.json` + query,
        'GET'
      );

      return () => {
        clearTimeout(timer);
      };
    }, 500);
  }, [enteredFilter, setIngredients, sendRequest, inputRef]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear} />}

      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={e => setEnteredFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
