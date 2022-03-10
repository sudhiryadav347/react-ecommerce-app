import cartContext from "./cart-context";

const CartProvider = props => {
	
        const addItemHandler = item => {
            
        };
    
        const removeItemHandler = ID => {
    
        }  

        const cartProviderValues = {
            cartItems: [{ID: 1, name: 'product name one',image : 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' ,quantity: 2, price: 240.98}],
            // cartItems: [],
            totalItems: 1,
            totalAmount: 0,
            addItem: addItemHandler,
            removeItem: removeItemHandler
        }
    
        return (
            <cartContext.Provider
                value={ cartProviderValues }
            >
                {props.children}
            </cartContext.Provider>
        );
}

export default CartProvider;