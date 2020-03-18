import React from 'react';

const style = {
  display: 'inline-block',
  padding: '16px',
  textAlign: 'center',
  margin: '16px',
  border: '1px solid black'
};

const CharComponent = char => {
  return <div style={style}>{char}</div>;
};

export default CharComponent;
