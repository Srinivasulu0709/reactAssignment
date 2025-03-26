import React from 'react';
import {Button,Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ConfirmOrder() {

    const navigate = useNavigate();

  return (
    <div className='cofirm-order'>
        <Card bg="Success" className="text-center confirm-card">
      <Card.Header>Estimated Delivery Date 29th March 2025</Card.Header>
      <Card.Body>
        <Card.Title>Thank you for your order</Card.Title>
        <Card.Text>
            <p>Order Number  #{Math.floor(10000000 + Math.random() * 90000000).toString()}</p>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button className='button-color' onClick={() => navigate('/')}>Continue Shopping</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ConfirmOrder