import React from 'react';

class UserInput extends React.Component {
  render() {
    return (
      <div>
        <input type='text' onChange={this.props.changeNameHandler} />
      </div>
    );
  }
}

export default UserInput;