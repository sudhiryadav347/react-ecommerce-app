import React from 'react';
import { Col } from 'react-bootstrap';

const Statictextblock = (props) => {
  return (
      <React.Fragment>
          {props.isLogin && (
            <Col md={{ span: 6 }}> 
             <h1>Login</h1>
             <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Lorem Ipsum has been the industry's standard dummy text ever
               since the 1500s,
             </p>
                 </Col>
          )}
          {props.isSignup && (
            <Col md={{ span: 6 }}> 
             <h1>Signup</h1>
             <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Lorem Ipsum has been the industry's standard dummy text ever
               since the 1500s,
             </p>
                 </Col>
          )}
          </React.Fragment>
  );
};

export default Statictextblock;
