import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import * as actionTypes from '../store/actions';

class Persons extends Component {
  personAddedHandler = (name, age) => {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name,
      age,
    };

    this.props.addPersonHandler(newPerson);
  };

  personDeletedHandler = personId => {
    this.props.deletePersonHandler(personId);
  };

  render() {
    return (
      <div>
        <AddPerson personAdded={this.personAddedHandler} />
        {this.props.persons.map(person => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.personDeletedHandler(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  persons: state,
});

const mapDispatchToProps = dispatch => ({
  addPersonHandler: payload =>
    dispatch({ type: actionTypes.ADD_PERSON, payload }),
  deletePersonHandler: id => dispatch({ type: actionTypes.REMOvE_PERSON, id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
