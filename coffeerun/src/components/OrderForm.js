import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

function OrderForm() {
  const [coffee, setCoffee] = useState('');
  const [email, setEmail] = useState('short');
  const [size, setSize] = useState('');
  const [flavor, setFlavor] = useState('');
  const [strength, setStrength] = useState(30);

  const sizes = [
    { value: 'short', label: 'Short' },
    { value: 'tall', label: 'Tall' },
    { value: 'grande', label: 'Grande' },
  ];

  return (
    <Card>
      <CardHeader>Order Form</CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Label for="order">Coffee Order</Label>
            <Input
              id="order"
              type="text"
              autoFocus
              required
              pattern="[a-zA-Z\s]+"
              value={coffee}
              onChange={(event) => setCoffee(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="emailAddress">Email</Label>
            <Input
              id="emailAddress"
              type="email"
              placeholder="who@dr.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
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
          <Button color="primary" type="submit">Submit</Button>
          <Button className="float-right" color="danger" type="reset">Reset</Button>
        </Form>
      </CardBody>
    </Card>
  );
}

export default OrderForm;
