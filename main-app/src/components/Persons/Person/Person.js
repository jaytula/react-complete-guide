import React from 'react';
import classes from './Person.module.css';

class Person extends React.Component {
  render() {
    console.log('[Person.js] rendering...');
    const props = this.props;
    return [
        <p key="i1" onClick={() => props.click()}>
          I'm a {props.name} and I am {props.age} years old!
        </p>,
        <p key="i2" >{props.children}</p>,
        <input key="i3" type='text' onChange={props.changed} value={props.name} />
    ];
  }
}

export default Person;
