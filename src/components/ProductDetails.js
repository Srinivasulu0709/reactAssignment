import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Button,Card,Container} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';


function ProductDetails() {

  const { productName } = useParams();
  const [product,setProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        const foundProduct = response.data.find((item) => 
          item.title.toLowerCase().replace(/\s+/g, '-') === productName
        );
        setProduct(foundProduct);
      } catch(err)  {
        console.log("Error fetching products",err)
      } 
    }
    getProducts();
  },[productName]);

 
  if (!product) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text className='poduct-description'><Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.5} readOnly size="small"/></Card.Text>
          <Card.Text>Price: Rs.{product.price}</Card.Text>
          <Button>Add to Cart</Button>
        </Card.Body>
      </Card>
    </Container>
  );

}


export default ProductDetails