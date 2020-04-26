import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
  state = {
    name: 'Max',
    age: 28,
  };

  onNameChangeHandler = event => {
    this.setState({
      name: event.target.value,
    });
  };

  onAgeChangeHandler = event => {
    this.setState({
      age: event.target.value,
    });
  };

  render() {
    return (
      <div className='AddPerson'>
        <input
          type='text'
          value={this.state.name}
          onChange={this.onNameChangeHandler}
          placeholder='Name'
        />
        <input
          type='number'
          value={this.state.age}
          placeholder='age'
          onChange={this.onAgeChangeHandler}
        />
        <button
          onClick={() =>
            this.props.personAdded(this.state.name, this.state.age)
          }
        >
          Add Person
        </button>
      </div>
    );
  }
}

export default AddPerson;
