import React, {useEffect,useState} from 'react';
import { Button, Container,Image,ButtonGroup,Row,Col,ListGroup,Form, Card,InputGroup } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';
import Payment from './Payment';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({updateCartCount}) {
const [cartItems, setCartItems] = useState([]);
const navigate = useNavigate();

 useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    updateCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [updateCartCount]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigateConfirmation = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    updateCartCount(0);
    navigate('/confirmorder');
  }

  return (
    <Container className='mb-5 checkout-page'>
        <Row>
           <Col sm={8}>
            <CheckoutForm />
            <Payment />
           </Col>

            <Col sm={4}>
                       <h4>Order Summary</h4>
                       <ListGroup as="ol">
                         <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
                           <div className="ms-2 me-auto">
                             <div className="fw-bold">Sub Total</div>
                           </div>
                           <p> Rs. {totalPrice} </p>
                         </ListGroup.Item>
                         <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
                           <div className="ms-2 me-auto">
                             <div className="fw-bold">Shipping</div>
                           </div>
                           <p>Free </p>
                         </ListGroup.Item>
                         <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
                           <div className="ms-2 me-auto">
                             <div className="fw-bold">Estimated Tax</div>
                           </div>
                           <p> - </p>
                         </ListGroup.Item>
                         <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
                           <div className="ms-2 me-auto">
                             <div className="fw-bold">Estimated Total</div>
                           </div>
                           <h5> Rs. {totalPrice}  </h5>
                         </ListGroup.Item>
                         <Button variant="mb-2 mt-3 " className='button-color' onClick={()=>navigateConfirmation()} >Place Order</Button>
                         </ListGroup>
                         
                   </Col>
        </Row>
    </Container>
  )
}

export default CheckoutPage