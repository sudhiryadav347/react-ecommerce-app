import React, { useState } from "react";

const cartContext = React.createContext({
	cartItemsCount: 0,
	cartItems: 0,
});

export const CartContextProvider = (props) => {
    
	const [cartCount, setcartCount] = useState(0);
	const cartContentCounterHandler = (data) => {
		setcartCount(data);
	};

	return (
		<cartContext.Provider
			value={{
				cartItemsCount: cartCount,
				cartItems: cartContentCounterHandler,
			}}
		>
			{props.children}
		</cartContext.Provider>
	);
};

export default cartContext;
