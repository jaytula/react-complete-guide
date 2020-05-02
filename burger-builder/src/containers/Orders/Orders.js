import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    // axios.get('/orders.json').then(res => {
    //   this.setState({loading: false});
    //   const { data } = res;
    //   const orders = Object.keys(data).map(key => {
    //     return { id: key, ...data[key] };
    //   });
    //   this.setState({ orders });
    //   console.log(orders);
    // }).catch(err => {
    //   this.setState({loading: false});
    // })
    this.props.onFetchOrders();
  }
  render() {
    if(this.props.loading) return <Spinner />

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
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders()),
});

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(Orders),
  axios
);
