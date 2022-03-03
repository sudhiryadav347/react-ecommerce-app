import React, { Component, state, useState } from "react";
import { Button } from "react-bootstrap";
import Productrow from "./Productrow";

const Addtocart = (props) => {
	const [Label, setLabel] = useState("Add to Cart");
	const AddedToCart = (param) => {
		setLabel(param);
		setTimeout(() => {
			setLabel("Add to Cart");
		}, 1000);
		props.addItemtoCart({
			ID: props.ProductDetails.ID,
			name: props.ProductDetails.name,
			price: props.ProductDetails.price,
			quantity: 1,
		});
	};

	return (
		<div>
			<Button
				variant="primary"
				onClick={() => {
					AddedToCart("Added to Cart");
				}}
			>
				{Label}
			</Button>
		</div>
	);
};

export default Addtocart;
