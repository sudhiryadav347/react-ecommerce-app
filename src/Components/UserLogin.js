import React, { useState, useEffect } from "react";
import { Form, Button, Col, Card, Alert } from "react-bootstrap";

const Userlogin = (props) => {
	// const [EnteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	const [UserInfo, setUserInfo] = useState({ email: "", password: "" });
	const [FieldValidity, setFieldValidity] = useState({
		email: "",
		password: "",
	});
	// const [EnteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setformIsValid] = useState(false);

	useEffect(() => {
		// setformIsValid(
		//   UserInfo.email.includes('@') && UserInfo.password.trim().length > 6
		// );
    const identifier = setTimeout(() => {
      console.log('Checking form validity.')
				setformIsValid(
					UserInfo.email.includes("@") && UserInfo.password.trim().length > 6
				);
    }, 500);

    return () => {
      console.log('Cleaning timeout of previous key stroke.');
      clearTimeout(identifier);
    }
	}, [UserInfo.email, UserInfo.password]);

	const emailChangeHandler = (event) => {
		// setEnteredEmail(event.target.value);
		setUserInfo({ ...UserInfo, email: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		// setEnteredPassword(event.target.value);
		setUserInfo({ ...UserInfo, password: event.target.value });
	};

	const validateEmailHandler = () => {
		// setEmailIsValid(EnteredEmail.includes('@'));
		// setEmailIsValid(UserInfo.email.includes('@'));
		setFieldValidity({ ...FieldValidity, email: UserInfo.email.includes("@") });
	};

	const validatePasswordHandler = () => {
		// setPasswordIsValid(EnteredPassword.trim().length > 6);
		// setPasswordIsValid(UserInfo.password.trim().length > 6);
		setFieldValidity({
			...FieldValidity,
			password: UserInfo.password.trim().length > 6
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(UserInfo.email, UserInfo.password);
	};

	return (
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
								isInvalid={!FieldValidity.email}
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
								isInvalid={!FieldValidity.password}
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
