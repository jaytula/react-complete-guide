import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post('/orders.json', action.orderData, {
      params: { auth: action.token },
    });
    const id = res.data.name;
    yield put(actions.purchaseBurgerSuccess(id, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try {
    const res = yield axios.get('/orders.json', {
      params: {
        auth: action.token,
        orderBy: '"userId"',
        equalTo: `"${action.userId}"`,
      },
    });

    const fetchedOrders = Object.keys(res.data).map(key => {
      return { id: key, ...res.data[key] };
    });
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFailed());
  }
}
