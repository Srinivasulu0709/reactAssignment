import React from 'react';
import {Col,Form,Row} from 'react-bootstrap';

function Payment() {
  return (
    <div>
        <h3>Payment Details</h3>
        <Form>
        {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            checked
            label="Credit Card"
            name="credit card"
            type={type}
            id={`inline-${type}-Credit Card`}
          />
          <Form.Check
            inline
            label="Debit card"
            name="debitcard"
            type={type}
            id={`inline-${type}-Debit card`}
          />
          <Form.Check
            inline
            label="UPI"
            type={type}
            id={`inline-${type}-UPI`}
          />
        </div>
      ))}

<Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name On Card</Form.Label>
        <Form.Control type='email' placeholder="Name on card" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridCard">
        <Form.Label>Card Number </Form.Label>
        <Form.Control placeholder="Card Number" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridExp">
          <Form.Label>Expiry</Form.Label>
          <Form.Control type="text" placeholder="Expiry" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCVV">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" placeholder="CVV" />
        </Form.Group>
      </Row>
        </Form>

    </div>
  )
}

export default Payment