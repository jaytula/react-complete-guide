import React from 'react';
import './UserOutput.css';

class UserOutput extends React.Component {
  render() {
    const { name } = this.props;
    const style = {
      backgroundColor: 'green',
      color: 'white'
    };

    return (
      <div className='UserOutput'>
        <p>My name is {name}.</p>
        <p style={style}>This is paragraph 2.</p>
      </div>
    );
  }
}

export default UserOutput;
