import React, { useReducer } from 'react';
import Statictextblock from './StaticTextBlock';
import { Form, Button, Col, Card, Alert, Row } from 'react-bootstrap';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });
  console.log(passwordState.isValid);
  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'USER_BLUR',
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      val: event.target.value,
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'USER_BLUR'
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Row>
      <Statictextblock />
      <Col md={{ span: 6 }}>
        {!props.showAlert && (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              This is just a practice login form and not connected to any
              database. Please use sudhir@gmail.com as email and 1234567 as
              password to test.
            </p>
          </Alert>
        )}
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
                  isInvalid={!emailState.isValid}
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
                  isInvalid={!passwordState.isValid} 
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!(emailState.isValid && passwordState.isValid)}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
