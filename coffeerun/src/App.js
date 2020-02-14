import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RRNavLink,
} from 'react-router-dom';
import OrderForm from './components/OrderForm';
import PendingOrders from './components/PendingOrders';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([
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
  ]);

  const addOrder = (newOrder) => {
    setOrders((currentOrders) => [...currentOrders, newOrder]);
  };

  const completeOrder = (emailAddress) => {
    setOrders(
      (currentOrders) => currentOrders.filter((order) => order.emailAddress !== emailAddress),
    );
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar dark color="dark" expand="md" className="mb-4">
        <NavbarBrand href="/">CoffeeRun</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/">Order Form</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/pending">Pending Orders</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/pending">
            <PendingOrders pendingOrders={orders} completeOrder={completeOrder} />
          </Route>
          <Route exact path="/">
            <OrderForm addOrder={addOrder} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
