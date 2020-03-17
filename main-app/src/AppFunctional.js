import React, { useState } from 'react';
import './App.css';

import Person from './Person/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Max', age: 28 },
    { name: 'Manu', age: 29},
    { name: 'Stephanie', age: 25}
  ]);
  const [otherState, setOtherState] = useState('some other value');

  const switchNameHandler = () => {
    setPersons([
        { name: 'Maximillian', age: 28 },
        { name: 'Manu', age: 29},
        { name: 'Stephanie', age: 27}
      ]
    )
  }
    return (
      <div className='App'>
        <h1>Hi, I'm a React App.</h1>
        <p>This is a really working!</p>
        <button onClick={switchNameHandler}>Switch Name</button>
        <Person name={persons[0].name} age={persons[0].age} />
        <Person name={persons[1].name} age={persons[1].age} >
          My Hobbies: Racing
        </Person>
        <Person name={persons[2].name} age={persons[2].age} />
      </div>
    );
}

export default App;
