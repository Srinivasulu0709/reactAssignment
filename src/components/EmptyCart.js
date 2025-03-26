import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import emprycart from './../assets/images/empty_cart.jpg';
import { Container,Button } from 'react-bootstrap';


function EmptyCart() {

const navigate = useNavigate();

  return (
    <Container className="text-center">
        <Image src= {emprycart} width={400} height={350} />
        <h2>Your Cart is Empty</h2>
        <Button  className='contine-button button-color' onClick={()=> navigate('/')} >Continue Shopping </Button>
    </Container>
    
  )
}

export default EmptyCart;