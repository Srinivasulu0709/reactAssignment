import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Homepage.scss';
import {Button,Card,Col,Row,ButtonGroup} from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import {  useNavigate } from 'react-router-dom';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Homepage({ searchTerm, setCartCount }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };
    getProducts();

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    updateCartCount(savedCart);
  }, []);

  const updateCartCount = (cartItems) => {
    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); 

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const getProductQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-products flex-grow-1 mb-3">
  
      <Row sm={1} md={4} className="g-4">
        {filteredProducts.map((product) => {
          const quantity = getProductQuantity(product.id);
          const isInCart = quantity > 0;

          return (
            <Col key={product.id}>
              <Card className="product-card">
               
                <Card.Img
                  className="product-image"
                  variant="top"
                  src={product.image}
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                />
                <Card.Body>
                <div  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }>
                  <Card.Title className="home-product-title">{product.title}</Card.Title>
                  <Card.Text className="home-product-description">
                    {product.description}
                  </Card.Text>
                 
                </div>
                 <Card.Text className="product-rating">
                    <Rating
                      name="half-rating-read"
                      defaultValue={product.rating.rate}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </Card.Text>
                  <Card.Text className="home-product-price">Rs.{product.price}</Card.Text>
                  {!isInCart ? (
                    <Button  className="add-cart-button button-color" onClick={() => handleAddToCart(product)}> Add to Cart</Button>
                  ) : (
                    <ButtonGroup className='button-group' >
                      <Button
                       variant="secondary"
                        className='decrease-button'
                        onClick={() => decreaseQuantity(product.id)}
                        disabled={quantity === 0}
                      >
                        { quantity === 1 ? <MdDelete /> :<FaMinus />}
                      </Button>
                      <Button  variant="secondary" className='quantity-button' disabled>
                        {quantity}
                      </Button>
                      <Button
                       variant="secondary"
                        className='increase-button'
                        onClick={() => increaseQuantity(product.id)}
                      >
                        <FaPlus />
                      </Button>
                    </ButtonGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Homepage;

