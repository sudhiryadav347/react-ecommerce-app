import { useReducer } from "react";
import cartContext from "./cart-context";

const defaultCartState = {
	cartItems: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const newTotalAmount = state.totalAmount + (action.item.price * action.item.quantity);

			// find index of the item if it already exists.
			const existingCartItemIndex = state.cartItems.findIndex(
				(item) => item.ID === action.item.ID
			);

            // save existing item in existingCartItem
			const existingCartItem = state.cartItems[existingCartItemIndex];

            let updatedItems;

            // existingCartItem is truthy then just update the quantity 
			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					quantity: existingCartItem.quantity + action.item.quantity,
				};
				updatedItems = [...state.cartItems];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				// concat method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
				updatedItems = state.cartItems.concat(action.item);
			}

			return {
				cartItems: updatedItems,
				totalAmount: newTotalAmount,
			};

		default:
			return defaultCartState;
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer( cartReducer, defaultCartState );

	const addItemHandler = (item) => {
		dispatchCartAction({
			type: "ADD",
			item: item,
		});
	};

	const removeItemHandler = (ID) => {
		dispatchCartAction({
			type: "REMOVE",
			id: ID,
		});
	};

	const cartProviderValues = {
		cartItems: cartState.cartItems,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};

	return (
		<cartContext.Provider value={cartProviderValues}>
			{props.children}
		</cartContext.Provider>
	);
};

export default CartProvider;
