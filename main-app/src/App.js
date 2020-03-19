import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Manu', age: 29 },
      { id: 3, name: 'Stephanie', age: 25 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = this.state.persons.slice();
    persons[personIndex] = person;
    this.setState({ persons: persons });
  };

  deletePersonHandler = index => {
    const persons = this.state.persons.slice();
    persons.splice(index, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  };

  render() {
    const style = {
      color: 'white',
      font: 'inherit',
      border: '1px solid red',
      backgroundColor: 'green',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => (
            <Person
              key={person.id}
              name={person.name}
              age={person.age}
              click={this.deletePersonHandler.bind(this, index)}
              changed={event => this.nameChangeHandler(event, person.id)}
            ></Person>
          ))}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        color: 'black',
        backgroundColor: 'salmon'
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2) classes.push('red');
    if(this.state.persons.length <= 1) classes.push('bold');

    return (
      <div className='App'>
        <h1>Hi, I'm a React App.</h1>
        <p className={classes.join(' ')}>This is a really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: "App"}, React.createElement('h1', null, 'Does this work now') );
  }
}

export default Radium(App);
