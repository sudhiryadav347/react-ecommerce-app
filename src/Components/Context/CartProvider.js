import { useReducer } from "react";
import cartContext from "./cart-context";

const defaultCartState = {
	cartItems: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const newTotalAmount = state.totalAmount + action.item.price * action.item.quantity;

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

		case "REMOVE":

			// get the index of item we want to update
			const existingCartItemForRemovalIndex = state.cartItems.findIndex(
				(item) => item.ID === action.id
			);
			
			// get the existing item that we received index for.
			const existingItem = state.cartItems[existingCartItemForRemovalIndex];

			// calculate the updated amount by deducting price of item that we received in remove function
			const updatedtotalAmount = state.totalAmount - existingItem.price;

			// calculate new array of items.
			let newUpdatedItems;
			if(existingItem.quantity > 1){
				// create an object of item with reduced quantitye
				const newUpdatedItem = {...existingItem, quantity: existingItem.quantity - 1};

				// get the items array 
				newUpdatedItems = [...state.cartItems];

				// updated the new item in the existing array which will update the quantity of the product in its object.
				newUpdatedItems[existingCartItemForRemovalIndex] = newUpdatedItem;
			}
			else if( existingItem.quantity === 1){
				// If quantity is 1 then remove the item.
				// array filter will filter the array and return new array, it will keep only the items where received id is not equal to item.ID 
				// basically it will remove the item that we reduced.
				newUpdatedItems = state.cartItems.filter( item => item.ID !== action.id);
			}

			return {
				cartItems: newUpdatedItems,
				totalAmount: updatedtotalAmount
			};

		case "DELETE":

			// get the index of item we want to delete
			const getIndexForItemtoDelete = state.cartItems.findIndex(
				(item) => item.ID === action.id
			);

			// get the row total for the item we are deleting.
			const totalofItemDeleting =	state.cartItems[getIndexForItemtoDelete].price * state.cartItems[getIndexForItemtoDelete].quantity;

			// set the total amount
			const newTotalAmountafterDelete = state.totalAmount - totalofItemDeleting;

			// splice the item from the cartItems object
			const existingCartItems = [...state.cartItems];

			// from the current cartItems array remove 1 item from index position.
			existingCartItems.splice(getIndexForItemtoDelete, 1);

			return {
				cartItems: existingCartItems,
				totalAmount: newTotalAmountafterDelete,
			};

		default:
			return defaultCartState;
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

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

	const deleteItemHandler = (ID) => {
		dispatchCartAction({
			type: "DELETE",
			id: ID,
		});
	};

	const cartProviderValues = {
		cartItems: cartState.cartItems,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
		deleteItem: deleteItemHandler,
	};

	return (
		<cartContext.Provider value={cartProviderValues}>
			{props.children}
		</cartContext.Provider>
	);
};

export default CartProvider;
