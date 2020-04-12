import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {
  render() {
    if (!this.props.id)
      return <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    return (
      <div className='FullPost'>
        <h1>Title</h1>
        <p>Body</p>
        <div className='Edit'>
          <button className='Delete'>Delete</button>
        </div>
      </div>
    );
  }
}

export default FullPost;
