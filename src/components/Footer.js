import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-2">
    <Container>
      <Row>
        <Col md={4} className="mb-3">
          <h5>About Us</h5>
          <p>We provide the best solutions for your business growth and innovation.</p>
        </Col>

        <Col md={4} className="mb-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/home" className="text-light text-decoration-none">Home</a></li>
            <li><a href="/services" className="text-light text-decoration-none">Services</a></li>
            <li><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
          </ul>
        </Col>

        <Col md={4} className="mb-3">
          <h5>Contact Info</h5>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <p>&copy; {new Date().getFullYear()} YourCompany. All Rights Reserved.</p>
      </div>
    </Container>
  </footer>
  )
}

export default Footer