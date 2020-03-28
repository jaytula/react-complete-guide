import React from 'react';
import Person from './Person/Person';

class Persons extends React.PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerviedStateFromProps');
  //   return state;
  // }

  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if (nextProps.persons !== this.props.persons) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Persons.js] getSnapshopBeforeUpdate');
    return { message: 'Snapshot!' };
  }

  // componentWillUpdate() {
  //   console.log('[Persons.js] componentWillUpdate');
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Persons.js] rendering...');

    return this.props.persons.map((person, index) => (
      <Person
        key={person.id}
        name={person.name}
        age={person.age}
        click={this.props.clicked.bind(this, index)}
        changed={event => this.props.changed(event, person.id)}
        isAuth={this.props.isAuthenticated}
      ></Person>
    ));
  }
}

export default Persons;
