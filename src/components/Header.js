import React from 'react';
import { Container, Form, Nav, Navbar,Image } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import logo from './../assets/images/app_logo.jpg'


function Header({ setSearchTerm, cartCount }) {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2 nav-bar" bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')} className="navbar-logo">
        <Image src= {logo} width={50} height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 justify-content-center w-100" navbarScroll>
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link>Products</Nav.Link>
            <Nav.Link>Electronics</Nav.Link>
            <Nav.Link>Mobiles</Nav.Link>
          </Nav>
          <Form className="d-flex search-form">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-4"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaRegUserCircle className="me-4 navbar-logo" size={40} color="white" />
            <IoCartOutline
              className="navbar-logo"
              size={40}
              color="white"
              onClick={() => navigate('/cart')}
            />
            <Badge bg="primary" className="cart-count">{cartCount}</Badge>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default Header;

