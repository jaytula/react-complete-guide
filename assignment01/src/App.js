import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Hello World!</h1>
        <UserOutput />
        <UserOutput />
        <UserOutput />
      </div>
    );
  }
}

export default App;
