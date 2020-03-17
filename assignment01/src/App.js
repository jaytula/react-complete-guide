import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Hello World!</h1>
        <UserOutput name="Ruby" />
        <UserOutput name="Python" />
        <UserOutput name="Go" />
      </div>
    );
  }
}

export default App;
