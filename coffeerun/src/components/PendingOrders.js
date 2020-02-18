import React, { useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { completeOrder, fetchOrders } from '../actions';

function mapStateToProps(state) {
  return {
    fetchingOrders: state.fetchingOrders,
    pendingOrders: state.pendingOrders,
  };
}

function PendingOrders({ dispatch, fetchingOrders, pendingOrders }) {
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]); // will run once, dispatch never changes

  return (
    <Card>
      <CardHeader>Pending Orders</CardHeader>
      <CardBody>
        { fetchingOrders ? 'Loading' : (
          <ul>
            {pendingOrders.map((order) => (
              <li key={order.emailAddress}>
                <Input
                  type="checkbox"
                  onClick={() => dispatch(completeOrder(order.emailAddress))}
                />
                {order.size}
                {' '}
                {order.coffee}
                {order.flavor ? ` with ${order.flavor}` : ''}
                {' ['}
                {order.emailAddress}
                {'] ['}
                {order.strength}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

PendingOrders.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchingOrders: PropTypes.bool.isRequired,
  pendingOrders: PropTypes.arrayOf(PropTypes.shape({
    coffee: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    flavor: PropTypes.string,
    strength: PropTypes.number.isRequired,
  })).isRequired,
};

// in this case, we pass a function mapStateToProps,
// which maps redux store state to props to pass to PendingOrders
// that returns a function which is applied to PendingOrers, and
// the connected component is returned and exported
export default connect(mapStateToProps)(PendingOrders);
