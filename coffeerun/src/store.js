import { createStore } from 'redux';

const initialState = {
  pendingOrders: [
    {
      coffee: 'mocha',
      emailAddress: 'jake@example.com',
      size: 'small',
      flavor: '',
      strength: 30,
    },
    {
      coffee: 'mocha',
      emailAddress: 'loren@example.com',
      size: 'grande',
      flavor: 'caramel',
      strength: 30,
    },
  ],
};

export const COMPLETE_ORDER = 'COMPLETE_ORDER';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

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

    default:
      return state;
  }
}

export default createStore(
  orders,
  initialState,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
