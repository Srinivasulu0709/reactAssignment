import React, { useEffect, useState } from 'react';
import { Button, Container,Image,ButtonGroup,Row,Col,ListGroup,Form,InputGroup, Card } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import EmptyCart from './EmptyCart';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';


function Cart({ updateCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    updateCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [updateCartCount]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartCount(newCart.reduce((acc, item) => acc + item.quantity, 0));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    updateCartCount(0);
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <EmptyCart />
      </Container>
    );
  }

  return (
    <Container className='mb-5 cart-page'>
      <h3>Your Cart</h3>
      <Row>
        <Col sm={9}>
        <div>
        <Form>
        <Card className='mb-2'  border="info">
      <Card.Body>
      <Form.Check
            inline
            label="Standard Delivery Free (3 to 4 days)"
            name="Standard Delivery Free"
            type= "Radio"
          />
      </Card.Body>
      </Card>
        <Card  border="info">
      <Card.Body>
      <Form.Check
            inline
            label="Choose your delivery date"
            name="Standard Delivery Free"
            type= "Radio"
          />
      </Card.Body>
      </Card>
        </Form>
      </div>
        <ListGroup as="ol" className='cart-list'>
            {cartItems.map((item) => (
              <div>
          <ListGroup.Item
                as="li"
                key={item.id}
                className="d-flex justify-content-between  py-5" 
              >
                <div className="ms-2 d-flex align-items-center gap-3"> 
                  <Image 
                    src={item.image} 
                    height={60}
                    width={60} 
                    alt={item.title} 
                    className="object-fit-contain" 
                  />
                  <div>
                    <p className="fw-bold">{item.title}</p>
                    <ButtonGroup className=" button-group">
                        <Button
                        className='decrease-button'
                          variant="secondary"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity === 0}
                        >
                          { item.quantity === 1 ? <MdDelete /> :<FaMinus />}
                        </Button>
                        <Button className='quantity-button' variant="secondary" disabled>
                          {item.quantity}
                        </Button>
                        <Button className='increase-button' variant="secondary" onClick={() => increaseQuantity(item.id)}>
                          <FaPlus />
                        </Button>
                    </ButtonGroup>
                  </div>
                </div>
                <p className="align-self-center cart-price"> Rs. {item.price} </p>
              </ListGroup.Item>
              <Divider />
              </div>
            ))}
        </ListGroup>

        <div className='mt-3 text-end'>
        <Button className='button-color' onClick={handleClearCart}> Remove All</Button>
        </div>   
        </Col>

        <Col sm={3}>
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
              <Button variant="pmb-2 mt-2" className='button-color' onClick={()=> navigate('/cart/checkout')}>Checkout</Button>
              <Form>
                 <InputGroup className="mb-3 mt-3">
                 <Form.Control
                                            placeholder="Promo code"
                                            />
                  <Button className='button-color' id="button-addon2"> Apply</Button>
                  </InputGroup>
              </Form>
              </ListGroup>
              
        </Col>
      </Row>

    </Container>
  );
}


export default Cart;