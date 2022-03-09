import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Addtocart = (props) => {
	const [Label, setLabel] = useState("Add to Cart");
	const [isLoading, setisLoading] = useState(false);

	const AddedToCart = (param) => {
		setisLoading(true);
		setLabel(param);
		setTimeout(() => {
			setLabel("Add to Cart");
			setisLoading(false);
		}, 1000);
		props.addItemtoCart({
			ID: props.ProductDetails.ID,
			name: props.ProductDetails.name,
			image:props.ProductDetails.image,
			price: props.ProductDetails.price,
			quantity: 1,
		});
	};

	return (
		<div>
			<Button
				variant="danger"
				disabled={isLoading}
				onClick={() => {
					AddedToCart("Adding...");
				}}
			>
				{Label}
			</Button>
		</div>
	);
};

export default Addtocart;
