import React from 'react';

class UserInput extends React.Component {
  render() {
    return (
      <div>
        <input type='text' onChange={this.props.changeNameHandler} value={this.props.name} />
      </div>
    );
  }
}

export default UserInput;