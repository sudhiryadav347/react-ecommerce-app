// reference: https://codepen.io/mystroken/pen/Moraab
import React, { useState } from "react";
import "./QuantitySelector.scss";

export default function QuantitySelector(props) {
	const [State, setState] = useState({
		value: 1,
	});

	const increment = () => {
		setState((prevState) => {
			return { value: prevState.value + 1 };
		});
	};

	const decrement = () => {
		setState((prevState) => {
			return { value: prevState.value > 1 ? prevState.value - 1 : 1 };
		});
	};

	return (
		<div>
			<div className='quantity-input'>
				<button
					className='quantity-input__modifier quantity-input__modifier--left'
					onClick={decrement}
				>
					&mdash;
				</button>
				<input
					className='quantity-input__screen'
					type='text'
					value={State.value}
					readOnly
				/>
				<button
					className='quantity-input__modifier quantity-input__modifier--right'
					onClick={increment}
				>
					&#xff0b;
				</button>
			</div>
		</div>
	);
}
