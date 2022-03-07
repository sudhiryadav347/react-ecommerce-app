import React, { useState } from "react";

const cartContext = React.createContext({
	cartItems: ()=>{},
    cartItemsCount: 0

});

export const CartContextProvider = (props) => {

	const [cartCount, setcartCount] = useState(0);
	const cartContentCounterHandler = (data) => {
		setcartCount(data);
	};

	return (
		<cartContext.Provider
			value={{
				cartItems: cartContentCounterHandler,
                cartItemsCount: cartCount
			}}
		>
			{props.children}
		</cartContext.Provider>
	);
};

export default cartContext;
