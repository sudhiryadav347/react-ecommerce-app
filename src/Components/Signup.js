import React, { useRef } from "react";
import { Row, Alert, Card, Form, Button, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Statictextblock from "./StaticTextBlock";

const Signup = () => {
	// useref to get the values from input fields.
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		// get entered email and password
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// optional: Add validation
		// TODO: Add validation.

		// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
		fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1EK0Kjeg6nIs3VSvft9mzDVuEfA8budE",
			{
				method: "POSt",
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => {
				if (response.ok) {
					// ...
				} else {
					response.json().then((data) => {
						// show an error modal
						console.log(data);
					});
				}
			})
			.then((data) => console.log(data));
	};

	return (
		<Row>
			<Statictextblock isSignup='true' />
			<Col md={{ span: 6 }}>
				<Card className='mt-3'>
					<Card.Body>
						<Form onSubmit={submitHandler} noValidate>
							<Form.Group className='mb-3' controlId='formBasicEmail'>
								<Form.Label>Email address</Form.Label>
								<Form.Control ref={emailInputRef} />
								<Form.Text className='text-muted'>
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group className='mb-3' controlId='formBasicPassword'>
								<Form.Label>Password(Min. 6 characters)</Form.Label>
								<Form.Control ref={passwordInputRef} />
							</Form.Group>
							<Row>
								<div class='d-flex align-items-center'>
									<div>
										<Button variant='danger' type='submit'>
											Signup
										</Button>
									</div>
									<div>
										<p class='display-6 fs-6 m-0 p-0 ps-4'>
											Already a user? 
											<NavLink to='/login' className="ps-1">
												Login here.
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

export default Signup;
