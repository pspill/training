import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SUBMIT_ORDER } from '../store';

const coffeeRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[\w.]+@([\w]+\.)+[\w]+$/;

function OrderForm(props) {
  const [coffee, setCoffee] = useState('');
  const [coffeeError, setCoffeeError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [size, setSize] = useState('short');
  const [flavor, setFlavor] = useState('');
  const [strength, setStrength] = useState(30);
  const [validForm, setValidForm] = useState(false);

  const sizes = [
    { value: 'short', label: 'Short' },
    { value: 'tall', label: 'Tall' },
    { value: 'grande', label: 'Grande' },
  ];

  const reset = () => {
    setCoffee('');
    setEmail('');
    setSize('short');
    setFlavor('');
    setStrength(30);
  };

  const submit = (event) => {
    const newOrder = {
      coffee,
      emailAddress: email,
      size,
      flavor,
      strength,
    };
    props.dispatch({
      type: SUBMIT_ORDER,
      order: newOrder,
    });
    reset();
    event.preventDefault();
  };

  useEffect(() => {
    let error = '';
    if (!coffee) {
      error = 'An order is required.';
    } else if (!coffeeRegex.test(coffee)) {
      error = 'Your order may only contain letters and spaces.';
    }
    setCoffeeError(error);
  }, [coffee]);

  useEffect(() => {
    let error = '';
    if (!email) {
      error = 'An email is required.';
    } else if (!emailRegex.test(email)) {
      error = 'Please enter a valid email.';
    }
    setEmailError(error);
  }, [email]);

  useEffect(() => {
    setValidForm(!coffeeError);
  }, [coffeeError]);

  return (
    <Card>
      <CardHeader>Order Form</CardHeader>
      <CardBody>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label for="order">Coffee Order</Label>
            <Input
              id="order"
              type="text"
              autoFocus
              value={coffee}
              invalid={!!coffeeError}
              valid={!coffeeError}
              onChange={(event) => setCoffee(event.target.value)}
            />
            <FormFeedback>{coffeeError}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="emailAddress">Email</Label>
            <Input
              id="emailAddress"
              type="email"
              value={email}
              invalid={!!emailError}
              valid={!emailError}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FormFeedback>{emailError}</FormFeedback>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend style={{ fontSize: '1rem' }}>Size</legend>
            {sizes.map(({ label, value }) => (
              <FormGroup check inline key={value}>
                <Input
                  type="radio"
                  name="size"
                  value={value}
                  id={`size-${label}`}
                  checked={size === value}
                  onChange={(event) => setSize(event.target.value)}
                />
                <Label for={`size-${label}`} check>{label}</Label>
              </FormGroup>
            ))}
          </FormGroup>
          <FormGroup>
            <Label for="flavor">Flavor Shot</Label>
            <Input
              type="select"
              id="flavor"
              value={flavor}
              onChange={(event) => setFlavor(event.target.value)}
            >
              <option value="">None</option>
              <option value="caramel">Caramel</option>
              <option value="almond">Almond</option>
              <option value="mocha">Mocha</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="strength">Strength</Label>
            <Input
              id="strength"
              type="range"
              min="0"
              max="100"
              step="1"
              value={strength}
              onChange={(event) => setStrength(parseInt(event.target.value, 10))}
            />
          </FormGroup>
          <Button color="primary" type="submit" disabled={!validForm}>Submit</Button>
          <Button className="float-right" color="danger" onClick={reset}>Reset</Button>
        </Form>
      </CardBody>
    </Card>
  );
}

OrderForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// connect() returns a function, which we call and pass in OrderForm,
// which returns the connected OrderForm, which we export
export default connect()(OrderForm);
