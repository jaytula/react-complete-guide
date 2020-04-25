import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];
  if(props.invalid && props.touched && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'textarea':
      inputElement = (
        <textarea className={inputClasses.join(' ')} {...props.elementConfig} />
      );
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
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
          className={inputClasses.join(' ')} onChange={props.changed}
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
