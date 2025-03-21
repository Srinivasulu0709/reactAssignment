import React from 'react';
import {Container,Form,Nav,Navbar} from 'react-bootstrap';
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

function Header({ setSearchTerm}) {

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2 nav-bar" bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand >Navbar scroll</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0 justify-content-center w-100"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">Link</Nav.Link>
          <Nav.Link href="#" >
            Link
          </Nav.Link>
        </Nav>
        <Form className="d-flex search-form">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-4"
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaRegUserCircle className="me-4" size={40} color="white" />
          <IoCartOutline size={40} color="white"  />
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header