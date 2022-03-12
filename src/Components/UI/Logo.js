import React from 'react';
import { Col, Image } from 'react-bootstrap';

const Logo = () => {
  return (
    <Col lg="9" className="logo-wrapper">
      <Image src="./logo.png" className="w-25" />
    </Col>
  );
};

export default Logo;
