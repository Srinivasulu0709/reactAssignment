import React from 'react';
import notfound from './../assets/images/page_not_found.jpg';
import {Image,Container} from 'react-bootstrap';

function PageNotFound() {
  return (
    <Container className='text-center mb-3'>
      <Image src= {notfound} width={400} />
    </Container>
  )
}

export default PageNotFound