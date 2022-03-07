import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Addtocart from "./Products/Addtocart";
import Productrow from "./Products/Productrow";
import axios from "axios";
import Rate from "./UI/Rate";
import cartContext from "./Context/cart-context";

const Home = (props) => {
	const [ProductData, setProductData] = useState([]);
	const [Cart, setCart] = useState([]);
	const cartCTX = useContext(cartContext);

	useEffect(() => {
		if (isCartSavedLocally()) {
			setCart(JSON.parse(localStorage.getItem("cart")));
			// props.cartContentCounter(getCartQuantities());
		}
		axios.get("https://fakestoreapi.com/products").then(function (response) {
			// handle success
			setProductData(response.data);
			// console.log(response.data);
		});

		cartCTX.cartItems(getCartQuantities());

		return () => {};
	}, []);

	const isCartSavedLocally = () => {
		let localCart = localStorage.getItem("cart");
		localCart = JSON.parse(localCart);
		if (localCart) {
			return true;
		} else {
			return false;
		}
	};

	// Create function to output sum of all the quantities from cart object saved in browser storage.
	const getCartQuantities = () => {
		const getCartDataFromLocalStorage = JSON.parse(
			localStorage.getItem("cart")
		);

    // make sure to stop running below part of this function which is related to cart if there is not cart set in localstorage
    // otherwise it will throw error because variable cart will be null.
		if (getCartDataFromLocalStorage == null) {
			return;
		}

		// console.log(getCartDataFromLocalStorage);

		const itemQantitiesOnly = [];

		getCartDataFromLocalStorage.map((item) => {
			return itemQantitiesOnly.push(item.quantity);
		});

		const getSumofQuantities = itemQantitiesOnly.reduce((a, b) => {
			return a + b;
		});

		return getSumofQuantities;
	};

	// function to create cart and then save it locally in browser
	const addItem = (item) => {

		// if cart key exists in the browser storage then spread existing object otherwise create blank array.
		const cartCopy = !isCartSavedLocally() ? [] : [...Cart];

		// get the ID from incoming cart item.
		const { ID } = item;

		// if ID exists then just update the qty
		const existingItem = cartCopy.find((cartItem) => cartItem.ID === ID);
		
    if (existingItem) {
			existingItem.quantity += item.quantity;
		}

		// otherwise push the item in the cartcopy array.
		else {
			cartCopy.push(item);
		}
		setCart(cartCopy);

		const stringCart = JSON.stringify(cartCopy);

		// update cart saved in browser storage to new state.
		localStorage.setItem("cart", stringCart);

		// send the total of quantities in cart object using props.
		// props.cartContentCounter(getCartQuantities());

		if (getCartQuantities() !== null) {
			cartCTX.cartItems(getCartQuantities());
		}
	};

	return (
		<Productrow>
			{
				// Using array.map to iterate through product data.
				ProductData.map((product, index) => {
					const productProp = {
						ID: product.id,
						name: product.title,
						image: product.image,
						price: product.price,
					};

					return (
						<Col key={index}>
							<Card>
								<Card.Img
									variant='top'
									src={product.image}
									alt=''
									className='p-5'
								/>
								<Card.Body>
									<h1 className='display-6 fs-3 text'>${product.price}</h1>
									<Card.Title>{product.title.slice(0, 20) + "..."}</Card.Title>
									<Card.Text>
										{product.description.slice(0, 100) + "..."}
									</Card.Text>
									Rate: {product.rating.rate}
									<Rate value={product.rating.rate} />
									<Addtocart
										ProductDetails={productProp}
										addItemtoCart={addItem}
									/>
								</Card.Body>
							</Card>
						</Col>
					);
				})
			}
		</Productrow>
	);
};

export default Home;
