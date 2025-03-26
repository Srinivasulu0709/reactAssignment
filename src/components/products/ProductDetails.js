import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Image,ListGroup,ButtonGroup} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import './ProductDetails.scss';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactImageMagnify from 'react-image-magnify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function ProductDetails({ setCartCount }) {
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [cart, setCart] = useState([]);
  const { productId } = useParams();

  useEffect(() => {

    const getProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        const images = Array(5).fill(response.data.image);
        setProduct(response.data);
        setProductImages(images);
        if (images.length > 0) setActiveImage(images[0]);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    getProducts();

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    updateCartCount(savedCart);
  }, [productId]);



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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (!product) return <p>Loading...</p>;
  const quantity = getProductQuantity(product.id);
  const isInCart = quantity > 0;

  

  return (
    <Container className="product-details-container mt-3">
      <Row>
        <Col sm={6} className="image-section">
   
      <div>
        {activeImage && (
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.title || 'Product Image',
                isFluidWidth: true,
                src: activeImage,
              },
              largeImage: {
                src: activeImage,
                width: 1200,
                height: 1800
              },
              enlargedImageContainerStyle: { zIndex: 9999 }
            }}
          />
        )}
      </div>

        <Slider {...carouselSettings}>
            {productImages.map((image, index) => (
              <div key={index} onClick={() => setActiveImage(image)} className="px-2">
                <Image
                height={120}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="cursor-pointer rounded-lg border-2 hover:border-blue-600 w-full h-32 object-contain"
                />
              </div>
            ))}
          </Slider>
        </Col>

        <Col sm={6}>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>

          <ListGroup horizontal>
            <ListGroup.Item>
              <Rating
                name="half-rating-read"
                value={product.rating.rate}
                precision={0.5}
                readOnly
                size="small"
              />
            </ListGroup.Item>
            <ListGroup.Item className="reviews">Reviews</ListGroup.Item>
            <ListGroup.Item className="reviews">Q&A</ListGroup.Item>
          </ListGroup>

          <h3 className="mt-3 product-price">Rs. {product.price}</h3>

          <div className="delivery-details">
            <p>
              <a href="#">FREE Delivery.</a> Wednesday, 26 March.
              <a href="#">Details</a>
            </p>
            <p>
              Or fastest delivery <label className="today-delivery">Today</label> order within{' '}
              <label className="delivery-time">3 hr 48 mins</label>
            </p>
            <p className="reviews">Delivering Hyderabad 500008</p>
            <h2 className="in-stock">In Stock</h2>
          </div>

          {!isInCart ? (
            <Button
             
              className="mt-2 add-cart-button button-color"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          ) : (
            <ButtonGroup className="mt-2 button-group">
              <Button
               className='decrease-button'
                variant="secondary"
                onClick={() => decreaseQuantity(product.id)}
                disabled={quantity === 0}
              >
                 { quantity === 1 ? <MdDelete /> :<FaMinus />}
              </Button>
              <Button  className='quantity-button' variant="secondary" disabled>
                {quantity}
              </Button>
              <Button className='increase-button' variant="secondary" onClick={() => increaseQuantity(product.id)}>
                <FaPlus />
              </Button>
            </ButtonGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}


export default ProductDetails;

