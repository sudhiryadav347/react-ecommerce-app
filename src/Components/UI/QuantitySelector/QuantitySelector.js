// reference: https://codepen.io/mystroken/pen/Moraab
import React, { useState } from "react";
import "./QuantitySelector.scss";

// Use forwardref on our custom component to pass from parent
// https://reactjs.org/docs/forwarding-refs.html

const QuantitySelector = React.forwardRef((props, ref) => {
	const [State, setState] = useState({
		value: 1,
	});

	const increment = (event) => {
		event.preventDefault();
		setState((prevState) => {
			return { value: prevState.value + 1 };
		});
	};

	const decrement = (event) => {
		event.preventDefault();
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
					type='input'
				>
					&mdash;
				</button>
				<input
					className='quantity-input__screen'
					type='text'
					value={State.value}
					ref={ref}
					readOnly
				/>
				<button
					className='quantity-input__modifier quantity-input__modifier--right'
					onClick={increment}
					type='input'
				>
					&#xff0b;
				</button>
			</div>
		</div>
	);
});

export default QuantitySelector;
