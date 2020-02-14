import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';


function App() {
  return (
    <Container>
      <Card>
        <CardHeader>Order Form</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="order">Coffee Order</Label>
              <Input id="order" type="text" autoFocus />
            </FormGroup>
            <FormGroup>
              <Label for="emailAddress">Email</Label>
              <Input id="emailAddress" type="email" placeholder="who@dr.com" />
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend style={{ fontSize: '1rem' }}>Size</legend>
              <FormGroup check inline>
                <Input
                  type="radio"
                  name="size"
                  value="short"
                  id="size-short"
                  defaultChecked
                />
                <Label for="size-short" check>Short</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  type="radio"
                  name="size"
                  value="tall"
                  id="size-tall"
                />
                <Label for="size-tall" check>Tall</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  type="radio"
                  name="size"
                  value="grande"
                  id="size-grande"
                />
                <Label for="size-grande" check>Grande</Label>
              </FormGroup>
              <FormGroup>
                <Label for="flavor">Flavor Shot</Label>
                <Input type="select" id="flavor">
                  <option value="">None</option>
                  <option value="caramel">Caramel</option>
                  <option value="almond">Almond</option>
                  <option value="mocha">Mocha</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="strength">Strength</Label>
                <Input id="strength" type="range" min="0" max="100" step="1" defaultValue="30" />
              </FormGroup>
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>
            <Button className="float-right" color="danger" type="reset">Reset</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default App;
