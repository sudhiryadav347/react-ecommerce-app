import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Card, Alert } from 'react-bootstrap';

const Userlogin = (props) => {
  const [EnteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [EnteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setformIsValid] = useState(false);

  useEffect(() => {
    setformIsValid(
      EnteredEmail.includes('@') && EnteredPassword.trim().length > 6
    );
  }, [EnteredEmail, EnteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(EnteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(EnteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(EnteredEmail, EnteredPassword);
  };

  return (
    <Col md={{ span: 6 }}>
      {!props.showAlert && <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          This is just a practice login form and not connected to any database. Please use sudhir@gmail.com as email and 1234567 as password to test.
        </p>
      </Alert>}
      <Card className="mt-3">
        <Card.Body>
          <Form onSubmit={submitHandler} noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                isInvalid={!emailIsValid}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password(Min. 6 characters)</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                isInvalid={!passwordIsValid}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!formIsValid}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Userlogin;
