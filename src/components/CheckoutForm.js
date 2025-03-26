import React from 'react';
import {Col,Form,Row} from 'react-bootstrap';


function CheckoutForm() {
  return (
    <div>
        <h4>Billing Address</h4>
        <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstname">
          <Form.Label>Frist Name</Form.Label>
          <Form.Control type="text" placeholder="Frist Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastname">
          <Form.Label>LastName</Form.Label>
          <Form.Control type="text" placeholder="LastName" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder="Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address </Form.Label>
        <Form.Control placeholder="Address" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>
    </Form>
    </div>
  )
}

export default CheckoutForm