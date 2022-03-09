import React, { useContext, useState } from "react";
import {
	Col,
	Modal,
	Nav,
	Button,
	Container,
	Row,
	Image,
} from "react-bootstrap";
import cartContext from "../Context/cart-context";
import styles from "./CartCounter.module.css";
import QuantitySelector from "./QuantitySelector/QuantitySelector";
import RowTotal from "./RowTotal";

export default function Cart(props) {
	const cartCTX = useContext(cartContext);
	const [ShowCart, setShowCart] = useState(false);
	const [CartItems, setCartItems] = useState([]);
	const getStoredCart = JSON.parse(localStorage.getItem("cart"));

	const handleShow = () => {
		setShowCart(true);
		setCartItems(getStoredCart);
	};

	const handleClose = () => {
		setShowCart(false);
		setCartItems(getStoredCart);
	};

	const deleteItem = (ID) => {
		const getCartQuantities = () => {
			let itemQantitiesOnly = [];

			getStoredCart.map((item) => {
				return itemQantitiesOnly.push(item.quantity);
			});

			const getSumofQuantities = itemQantitiesOnly.reduce((a, b) => {
				return a + b;
			});

			return getSumofQuantities;
		};

		let initialCartItems = CartItems;

		const findItemIndex = initialCartItems.findIndex(
			(cartItem) => cartItem.ID === ID
		);

		initialCartItems.splice(findItemIndex, 1);

		// If there are items present in the cart.
		if (initialCartItems.length > 0) {
			const stringCart = JSON.stringify(initialCartItems);
			localStorage.setItem("cart", stringCart);
			setCartItems(JSON.parse(localStorage.getItem("cart")));
			cartCTX.cartItems(getCartQuantities());
		}
		// if deleted all the items from the cart then remove cart key and do not display the cart modal
		// also set the cartItems in cart context to 0 so that everywhere it shows 0 items in cart.
		// because with empty cart key rendering the home component will give error.
		else {
			localStorage.removeItem("cart");
			setShowCart(false);
			cartCTX.cartItems(0);
		}
	};

	return (
		<Col className='cart-counter d-flex align-items-center justify-content-end'>
			<span className='align-middle'>
				<div className='fs-6'>
					<Nav.Link
						onClick={handleShow}
						className='position-relative p-0'
						disabled={cartCTX.cartItemsCount === 0 && true}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='25'
							height='25'
							fill='currentColor'
							className='bi bi-basket me-2 link-dark'
							viewBox='0 0 16 16'
						>
							<path d='M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z'></path>
						</svg>
						{cartCTX.cartItemsCount > 0 && (
							<span
								className={`position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle ${styles.badge}`}
							>
								<span style={{ color: "#fff" }}>{cartCTX.cartItemsCount}</span>
							</span>
						)}
					</Nav.Link>
					<Modal show={ShowCart} onHide={handleClose} centered fullscreen>
						<Modal.Header closeButton>
							<Container>
								<Row>
									<Modal.Title className='ps-5'>Shopping Cart.</Modal.Title>
								</Row>
							</Container>
						</Modal.Header>
						<Modal.Body className='show-grid p-0'>
							<Container>
								<table className='table cart-table mt-5'>
									<thead className='table-light'>
										<tr>
											<th scope='col'>Item</th>
											<th scope='col'>Item Name</th>
											<th scope='col'>Price</th>
											<th scope='col'>Quantity</th>
											<th scope='col'>Row Total</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{CartItems.map((item, index) => {
											return (
												<tr key={index}>
													<th scope='row'>
														<Image
															src={item.image}
															className={styles.thumbnail}
														></Image>
													</th>
													<td className='align-middle'>{item.name}</td>
													<td className='align-middle'>{item.price}</td>
													<td className='align-middle'>
														<QuantitySelector
															default={item.quantity}
															itemID={item.ID}
															itemIndex={index}
															itemPrice={item.price}
														/>
													</td>
													<td className='align-middle'></td>
													<td className='align-middle'>
														<Nav.Link onClick={() => deleteItem(item.ID)}>
															{
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	width='16'
																	height='16'
																	fill='currentColor'
																	className='bi bi-trash3'
																	viewBox='0 0 16 16'
																>
																	<path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
																</svg>
															}
														</Nav.Link>
													</td>
												</tr>
											);
										})}
									</tbody>
									<tfoot className={styles.FinalRow}>
										<tr>
											<td></td>
											<td></td>
											<td>Footer</td>
											<td>Footer</td>
											<td></td>
										</tr>
									</tfoot>
								</table>
							</Container>
						</Modal.Body>
						<Modal.Footer className='container'>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
							<Button variant='primary' onClick={handleClose}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</span>
		</Col>
	);
}
