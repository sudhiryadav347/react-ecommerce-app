import React from "react";

const cartContext = React.createContext({
	cartItems: [],
	totalItems: 0,
	totalAmount: 0,
	addItem: () => {},
	removeItem: () => {}
});


export default cartContext;
