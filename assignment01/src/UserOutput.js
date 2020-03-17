import React from 'react';

class UserOutput extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div>
        <p>My name is {name}.</p>
        <p>This is paragraph 2.</p>
      </div>
    );
  }
}

export default UserOutput;
