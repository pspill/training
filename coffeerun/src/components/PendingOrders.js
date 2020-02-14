import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

function PendingOrders({ completeOrder, pendingOrders }) {
  return (
    <Card>
      <CardHeader>Pending Orders</CardHeader>
      <CardBody>
        <ul>
          {pendingOrders.map((order) => (
            <li key={order.emailAddress}>
              <Input
                type="checkbox"
                onClick={() => completeOrder(order.emailAddress)}
              />
              {order.size}
              {' '}
              {order.coffee}
              {order.flavor ? `with ${order.flavor}` : ''}
              {' ['}
              {order.emailAddress}
              {'] ['}
              {order.strength}
              ]
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

PendingOrders.propTypes = {
  completeOrder: PropTypes.func.isRequired,
  pendingOrders: PropTypes.arrayOf(PropTypes.shape({
    coffee: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    flavor: PropTypes.string,
    strength: PropTypes.number.isRequired,
  })).isRequired,
};

export default PendingOrders;
