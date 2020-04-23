import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios.get('/orders.json').then(res => {
      this.setState({loading: false});
      const { data } = res;
      const orders = Object.keys(data).map(key => {
        return { id: key, ...data[key] };
      });
      this.setState({ orders });
      console.log(orders);
    }).catch(err => {
      this.setState({loading: false});
    })
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);
