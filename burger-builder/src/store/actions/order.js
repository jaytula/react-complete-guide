import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json', orderData, { params: { auth: token } })
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

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersStart());
    axios
      .get('/orders.json', {
        params: {
          auth: token,
          orderBy: '"userId"',
          equalTo: `"${userId}"`,
        },
      })
      .then(res => {
        const fetchedOrders = Object.keys(res.data).map(key => {
          return { id: key, ...res.data[key] };
        });
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFailed());
        // this.setState({loading: false});
      });
  };
};

// export const getOrders = () => {
//   return dispatch => {
//     axios
//       .get('/orders.json')
//       .then(res => {
//         const { data } = res;
//         const orders = Object.keys(data).map(key => {
//           return { id: key, ...data[key] };
//         });
//         dispatch(setOrders(orders))
//       })
//       .catch(err => {
//         // this.setState({loading: false});
//       });
//   };
// };
