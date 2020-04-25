import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'textarea':
      inputElement = (
        <textarea className={classes.InputElement} {...props.elementConfig} />
      );
      break;
    case 'select':
      inputElement = (
        <select className={classes.InputElement} value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case 'input':
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
