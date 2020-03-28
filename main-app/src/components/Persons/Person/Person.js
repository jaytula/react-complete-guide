import React from 'react';
import PropTypes from 'prop-types';
import classes from './Person.module.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  componentDidMount() {
    // document.querySelectorAll('input')[2].focus();
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
  }
  render() {
    console.log('[Person.js] rendering...');
    const props = this.props;
    return (
      <Aux>
        {this.props.isAuth ? <p>Authenticated!</p> : <p>Please Login!</p>}
        <p key='i1' onClick={() => props.click()}>
          I'm a {props.name} and I am {props.age} years old!
        </p>
        <p key='i2'>{props.children}</p>
        <input
          key='i3'
          // ref={inputEl => {this.inputElement = inputEl}}
          ref={this.inputElementRef}
          type='text'
          onChange={props.changed}
          value={props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
  click: PropTypes.func
};

export default withClass(Person, classes.Person);
