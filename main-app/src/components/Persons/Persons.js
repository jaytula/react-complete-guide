import React from 'react';
import Person from './Person/Person';

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person, index) => (
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
};

export default Persons;