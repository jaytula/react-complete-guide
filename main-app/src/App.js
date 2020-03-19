import React, { Component } from 'react';
import classes from './App.module.css';

import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let persons = null;
    let btnClass = '';
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => (
            <ErrorBoundary key={person.id}>
              <Person
                name={person.name}
                age={person.age}
                click={this.deletePersonHandler.bind(this, index)}
                changed={event => this.nameChangeHandler(event, person.id)}
              ></Person>
            </ErrorBoundary>
          ))}
        </div>
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) assignedClasses.push(classes.red);
    if (this.state.persons.length <= 1) assignedClasses.push(classes.bold);

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App.</h1>
        <p className={assignedClasses.join(' ')}>This is a really working!</p>

        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
