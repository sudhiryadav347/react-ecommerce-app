import React, { useReducer, useState, useEffect, useContext } from 'react';
import Statictextblock from './StaticTextBlock';
import { Form, Button, Col, Card, Row } from 'react-bootstrap';
import AuthContext from './Context/auth-context';
import { NavLink, useNavigate } from 'react-router-dom';
import DismissableAlert from './Alerts/DismissableAlert';

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
  const loginCTX = useContext(AuthContext);
  const [FormIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });
  const [isLoading, setisLoading] = useState(false);
  const [Alert, setAlert] = useState({
    show: false,
    message: 'Authentication failed!',
  });
  const navigate = useNavigate();

  //use object destructuring so that useeffect only runs when the emailState.isValid or passwordState.isValid changes
  // with curly brackets on the left we are using object destructuring not assigning values emailisValid and passwordisValid are the aliases.
  const { isValid: emailisValid } = emailState;
  const { isValid: passwordisValid } = passwordState;

  const closeAlertHandler = () => {
	setAlert({ show: false })
  }

  useEffect(() => {
	  console.log(Alert);
    const identifier = setTimeout(() => {
      // console.log("Checking form validity.");
      setFormIsValid(emailisValid && passwordisValid);
    }, 500);

    return () => {
      // console.log("Cleaning timeout of previous key stroke.");
      clearTimeout(identifier);
    };
    // in the parameters below you can also use [emailState.isValid, passwordState.isValid] but we want to demonstrate object destructuring
    // so used it this way.
  }, [emailisValid, passwordisValid, FormIsValid, Alert]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value,
    });

    setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
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

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'USER_BLUR',
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // loginCTX.onLogin(emailState.value, passwordState.value);
    setisLoading(true);

    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1EK0Kjeg6nIs3VSvft9mzDVuEfA8budE',
      {
        method: 'POSt',
        body: JSON.stringify({
          email: emailState.value,
          password: passwordState.value,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((Response) => {
        setisLoading(false);
        if (Response.ok) {
          return Response.json();
        } else {
          return Response.json().then((data) => {
            setAlert({ show: true, message: '1' + data.error.message });
            throw new Error(data.error.message);
          });
        }
      })

      .then((data) => {
        loginCTX.onLogin(data.idToken);
        navigate('/dashboard');
      })

      .catch((err) => {
        setAlert({ show: true, message: '2' + err.message });
      });

  };

  return (
    <Row>
      <Statictextblock isLogin="true" />
      <Col md={{ span: 6 }}>
        <DismissableAlert
          showAlert={Alert.show}
          variant="danger"
          message={Alert.message}
          dismissible="true"
		  closeAlert={closeAlertHandler}
        />
        <Card className="mt-3">
          <Card.Body>
            <Form onSubmit={submitHandler} noValidate>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={emailState.value}
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
                  minLength={6}
                  value={passwordState.value}
                  onChange={passwordChangeHandler}
                  onBlur={validatePasswordHandler}
                  isInvalid={!passwordState.isValid}
                />
              </Form.Group>
              <Row>
                <div className="d-flex align-items-center">
                  <div>
                    <Button
                      variant="danger"
                      type="submit"
                      disabled={!FormIsValid ? true : isLoading ? true : false}
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                  </div>
                  <div>
                    <p className="display-6 fs-6 m-0 p-0 ps-4">
                      Not a user yet?
                      <NavLink to="/signup" className="ps-1">
                        Create your account here.
                      </NavLink>
                    </p>
                  </div>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
