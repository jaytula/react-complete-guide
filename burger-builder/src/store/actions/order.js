import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
  };
};



export const purchaseBurgerStart = orderData => {
  return dispatch => {
    axios
      .post('/orders.json', orderData)
      .then(res => {
        const id = res.data.name;
        dispatch(purchaseBurgerSuccess(id, orderData));
        // this.setState({ loading: false });
        // this.props.history.push('/');
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
        // this.setState({ loading: false });
      });
  };
};
