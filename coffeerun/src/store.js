
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {
  fetchingOrders: false,
  pendingOrders: [],
};

export const COMPLETE_ORDER = 'COMPLETE_ORDER';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const START_ORDER_FETCH = 'START_ORDER_FETCH';
export const FINISH_ORDER_FETCH = 'FINISH_ORDER_FETCH';
export const foo = 'foo2';

function orders(state, action) {
  switch (action.type) {
    case SUBMIT_ORDER:
      return {
        ...state,
        pendingOrders: [...state.pendingOrders, action.order],
      };
    case COMPLETE_ORDER:
      return {
        ...state,
        pendingOrders: state.pendingOrders.filter(
          (order) => order.emailAddress !== action.emailAddress,
        ),
      };
    case FINISH_ORDER_FETCH:
      return { ...state, fetchingOrders: false, pendingOrders: action.orders }
    case START_ORDER_FETCH:
      return { ...state, fetchingOrders: true }

    default:
      return state;
  }
}

export default createStore(
  orders,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
