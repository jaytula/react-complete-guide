import React from 'react';

const MINIMUM_LENGTH = 5;

const ValidationComponent = props => {
  return (
    <p>
      {props.textLength < MINIMUM_LENGTH
        ? 'Text too short'
        : 'Text long enough'}
    </p>
  );
};

export default ValidationComponent;
