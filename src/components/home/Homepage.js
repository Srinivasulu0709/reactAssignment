import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Homepage.scss';
import {Button,Card,Col,Row} from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import {  useNavigate } from 'react-router-dom';

function Homepage({searchTerm}) {

  const [products,setProducs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducs(response.data);
      } catch(err)  {
        console.log("Error fetching products",err)
      } 
    }
    getProducts();
  },[])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (productName) => {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product/${formattedName}`);
  };

  return (
    <div>
      <div className="home-products flex-grow-1 mb-3">
    
      <Row xs={1} md={4} className="g-4">
      {filteredProducts.map((product) => (
        <Col key={product.id}>
            <Card className='product-card'>
              <Card.Img className="product-image" variant="top" src={product.image} onClick={() => handleViewDetails(product.title)} />
                <Card.Body>
                  <div onClick={() => handleViewDetails(product.title)}>
                    <Card.Title className='product-title' >{product.title}</Card.Title>
                    <Card.Text className='poduct-description'>{product.description}</Card.Text>
                    <Card.Text className='poduct-description'><Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.5} readOnly size="small"/></Card.Text>
                    <Card.Text className='poduct-price'>Rs.{product.price}</Card.Text>
                  </div>
                  <Button >Add Cart</Button>
                </Card.Body>
            </Card>
          </Col>
      ))}
      </Row>
    
  </div>
    </div>
   

  )
}

export default Homepage