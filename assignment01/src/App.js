import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput';
import UserInput from './UserInput';

class App extends Component {
  state = {
    name: 'JavaScript'
  }

  changeNameHandler = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Hello World!</h1>
        <UserInput changeNameHandler={this.changeNameHandler} name={this.state.name} />

        <UserOutput name={this.state.name} />
        <UserOutput name="Python" />
        <UserOutput name="Go" />
      </div>
    );
  }
}

export default App;
