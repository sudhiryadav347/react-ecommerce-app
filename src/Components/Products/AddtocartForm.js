import React, { useState, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import QuantitySelector from "../UI/QuantitySelector/QuantitySelector";

const AddtocartForm = (props) => {
	const [isValidQTY, setisValidQTY] = useState(true);
	const [Label, setLabel] = useState("Add to Cart");
	const [isLoading, setisLoading] = useState(false);
	const quantityInputRef = useRef();

	const AddedToCart = (event) => {
		event.preventDefault();
		setisLoading(true);
		setLabel("Adding...");
		setTimeout(() => {
			setLabel("Add to Cart");
			setisLoading(false);
		}, 1000);

		const enteredQuantity = quantityInputRef.current.value;
		// convert the received qty from string to number because enteredQuantity received is a string.
		const enteredQuantityNumber = +enteredQuantity;

		if (
			enteredQuantity.trim().length === 0 ||
			enteredQuantityNumber < 1 ||
			enteredQuantityNumber > 5
		) {
			setisValidQTY(false);
			return;
		}

		setisValidQTY(true);
		props.onAddToCart(enteredQuantityNumber);
	};

	return (
		<div>
			<Form onSubmit={AddedToCart}>
				<Row>
					<Col className='align-middle'>
						{/* TODO: After adding to the cart reset the quantity selector to 1 */}
						<QuantitySelector ref={quantityInputRef} />
					</Col>
					<Col>
						<Button variant='danger' type='submit' disabled={isLoading}>
							{Label}
						</Button>
					</Col>
				</Row>
			</Form>
			{!isValidQTY && (
				<p className='text-danger'>
					<small>Max QTY allowed is 5</small>
				</p>
			)}
		</div>
	);
};

export default AddtocartForm;
