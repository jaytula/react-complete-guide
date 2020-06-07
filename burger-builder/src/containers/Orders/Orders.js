import React, {  useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const Orders = ({token, loading, userId, orders, onFetchOrders}) => {
  useEffect(() => {
    if (token) {
      onFetchOrders(token, userId);
    }
  }, [token, userId, onFetchOrders])

  
    if (!token) return <Redirect to='/auth' />;
    if (loading) return <Spinner />;

    return (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  
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
