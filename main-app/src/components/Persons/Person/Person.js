import React from 'react';
import classes from './Person.module.css';

class Person extends React.Component {
  render() {
    console.log('[Person.js] rendering...');
    const props = this.props;
    return (
      <div className={classes.Person}>
        <p onClick={() => props.click()}>
          I'm a {props.name} and I am {props.age} years old!
        </p>
        <p>{props.children}</p>
        <input type='text' onChange={props.changed} value={props.name} />
      </div>
    );
  }
}

export default Person;
