// reference: https://codepen.io/mystroken/pen/Moraab
import React, { useState, useEffect, useContext } from "react";
import cartContext from "../../Context/cart-context";
import "./QuantitySelector.scss";

export default function QuantitySelector(props) {
	// Maintain local state for the Cart quantities of each item
	const [CartQTY, setCartQTY] = useState({
		value: props.default,
	});

	// Get the total cart quantities globally
	const cartCTX = useContext(cartContext);

	useEffect(() => {
		const updateCartQTY = () => {
			// Get the cart object from saved local storage
			const getCartDataFromLocalStorage = JSON.parse(
				localStorage.getItem("cart")
			);

			// Get the new QTY state
			const newUpdatedQTY = CartQTY.value;

			// Update the new QTY for the item in our local variable.
			getCartDataFromLocalStorage[props.itemIndex].quantity = newUpdatedQTY;

			// Convert local saved cart object to string
			const stringCart = JSON.stringify(getCartDataFromLocalStorage);

			// Replace the saved cart object in browser to new updated object that we created locally in this function.
			localStorage.setItem("cart", stringCart);

			// console.log(JSON.parse(localStorage.getItem("cart")));
		};

		updateCartQTY();


		return () => {};
	}, [CartQTY, props.itemIndex]);

	const increment = () => {
		setCartQTY((prevState) => {
			return { value: prevState.value + 1 };
		});

		// Get the total quantities and update it in cartcontext so that anywhere else where the # of items in cart
		// are displayed can get the most updated value.
		const getTotalQuantities = cartCTX.cartItemsCount;
		const newUpdatedtotalQTY = getTotalQuantities + 1;
		cartCTX.cartItems(newUpdatedtotalQTY);
	};

	const decrement = () => {
		setCartQTY((prevState) => {
			return { value: prevState.value > 1 ? prevState.value - 1 : 1 };
		});

		// console.log(
		// 	"item id" +
		// 		props.itemID +
		// 		"was removed and the updated qty is " +
		// 		Cart.value
		// );

		// Get the total quantities and update it in cartcontext so that anywhere else where the # of items in cart
		// are displayed can get the most updated value.
		const getTotalQuantities = cartCTX.cartItemsCount;
		const newUpdatedtotalQTY = getTotalQuantities - 1;
		cartCTX.cartItems(newUpdatedtotalQTY);
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
					value={CartQTY.value}
					readOnly
				/>
				<button
					className='quantity-input__modifier quantity-input__modifier--right'
					onClick={increment}
				>
					&#xff0b;
				</button>
			</div>
			{/* {(CartQTY.value * props.itemPrice).toFixed(2)} */}
		</div>
	);
}
