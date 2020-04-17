import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.id !== nextProps.id;
  // }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (
      !this.state.loadedPost ||
      this.state.loadedPost.id !== +this.props.match.params.id
    ) {
      console.log('loadData()');
      axios.get(`/posts/${this.props.match.params.id}`).then(res => {
        this.setState({ loadedPost: res.data });
      });
    }
  }

  deleteHandler = () => {
    axios.delete(`/posts/${this.props.match.params.id}`).then(res => {
      console.log(res);
    });
  };

  render() {
    // if (!this.props.id)
    //   return <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    let post = <p style={{ textAlign: 'center' }}>Loading...</p>;

    if (this.state.loadedPost) {
      post = (
        <div className='FullPost'>
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className='Edit'>
            <button className='Delete' onClick={this.deleteHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
