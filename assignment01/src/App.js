import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput';

class App extends Component {
  state = {
    name: 'JavaScript'
  }

  changeNameHandler = () => {
    this.setState({
      name: 'Dart'
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Hello World!</h1>
        <UserOutput name={this.state.name} />
        <UserOutput name="Python" />
        <UserOutput name="Go" />
      </div>
    );
  }
}

export default App;
