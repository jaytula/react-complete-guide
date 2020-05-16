import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Orders extends Component {
  componentDidMount() {

    if (this.props.token) {
      this.props.onFetchOrders(this.props.token, this.props.userId);
    }
  }
  render() {
    if (!this.props.token) return <Redirect to='/auth' />;
    if (this.props.loading) return <Spinner />;

    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.order.loading,
  orders: state.order.orders,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) =>
    dispatch(actions.fetchOrders(token, userId)),
});

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(Orders),
  axios
);
