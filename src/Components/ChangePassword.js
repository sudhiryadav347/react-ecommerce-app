import React, { useRef, useContext, useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import DismissableAlert from './Alerts/DismissableAlert';
import AuthContext from './Context/auth-context';

const Changepassword = () => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const authCTX = useContext(AuthContext);
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [fieldsMatch, setfieldsMatch] = useState(false);
  const [Alert, setAlert] = useState({
    show: false,
    variant: 'info',
    message: '',
  });

  useEffect(() => {
    (Password.length > 0) && (ConfirmPassword.length > 0) &&
    Password === ConfirmPassword
      ? setfieldsMatch(true)
      : setfieldsMatch(false);
  }, [Password, ConfirmPassword, setfieldsMatch, fieldsMatch]);

  const PasswordHandler = () => {
    setPassword(passwordRef.current.value);
  };

  const ConfirmPasswordHandler = () => {
    setConfirmPassword(confirmPasswordRef.current.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(Password.trim().length === ''){
        return;
    }

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA1EK0Kjeg6nIs3VSvft9mzDVuEfA8budE',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCTX.token,
          password: Password,
          returnSecureToken: false,
        }),

        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((Response) => {
        if (Response.ok) {
          return Response.json();
        } else {
          Response.json().then((data) => {
            setAlert({
              show: true,
              message: data.error.message + '1',
              variant: 'danger',
            });
          });
        }
      })
      .then((data) => {
        // Set the idToken again in AuthContextProvider
        authCTX.onLogin(data.idToken);

        setAlert({
          show: true,
          variant: 'success',
          message: 'Password changed successfully!.',
        });

        setPassword('');
        setConfirmPassword('');
      })

      .catch((err) => {
        setAlert({
          show: true,
          message: err.error.message + '3',
          variant: 'danger',
        });
      });
  };

  return (
    <React.Fragment>
      <DismissableAlert
        showAlert={Alert.show}
        message={Alert.message}
        variant={Alert.variant}
        dismissible="true"
      />
      {/* 
      // TODO: Do not validate until the input box state changes.
      */}
      <Form onSubmit={submitHandler} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>New Password (Min. 6 characters)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new password"
            onChange={PasswordHandler}
            isInvalid={!fieldsMatch}
            minLength={6}
            ref={passwordRef}
            value={Password}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            minLength={6}
            onChange={ConfirmPasswordHandler}
            isInvalid={!fieldsMatch}
            ref={confirmPasswordRef}
            value={ConfirmPassword}
          />
        </Form.Group>
        <Row>
          <div className="d-flex align-items-center">
            <div>
              <Button variant="danger" type="submit" disabled={!fieldsMatch}>
                Change Password
              </Button>
            </div>
          </div>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default Changepassword;
