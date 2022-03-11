import React, { useContext } from "react";
import { Modal, Nav, Button, Container, Row, Image } from "react-bootstrap";
import styles from "./Cart.module.css";
import QuantitySelector from "../UI/QuantitySelector/QuantitySelector";
import cartContext from "../Context/cart-context";

export default function Cart(props) {
	const cartCTX = useContext(cartContext);
	const hasItems = cartCTX.cartItems.length > 0 ? true : false;
	const totalAmount = cartCTX.totalAmount.toFixed(2);


	return (
		<Modal show={props.cartDisplay} onHide={props.onClose} centered fullscreen>
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
							{cartCTX.cartItems.map((item, index) => {
								// Here we are already mapping the items in cart, if + is clicked then we can simply create the item object again
								// and trigger the addItem method on cartcontext provider.
								const cartItem = {
									ID: item.ID,
									name: item.name,
									image: item.image,
									price: item.price,
									quantity: 1,
								}

								return (
									<tr key={index}>
										<th scope='row'>
											<Image
												src={item.image}
												className={styles.thumbnail}
											></Image>
										</th>
										<td className='align-middle'>
											{item.name}{" "}
											<small className='text-secondary'>
												x {item.quantity}
											</small>
										</td>
										<td className='align-middle'>{item.price}</td>
										<td className='align-middle'>
											<QuantitySelector
												addItem={()=>cartCTX.addItem(cartItem)}
												reduceItem={()=>cartCTX.removeItem(item.ID)}
												value={item.quantity}
												min={1}
												max={5}
											/>
										</td>
										<td className='align-middle'>
											${(item.price * item.quantity).toFixed(2)}
										</td>
										<td className='align-middle'>
											<Nav.Link
												onClick={() => cartCTX.deleteItem(item.ID)}
												className='link-danger'
											>
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
								<td>${totalAmount}</td>
							</tr>
						</tfoot>
					</table>
				</Container>
			</Modal.Body>
			<Modal.Footer className='container'>
				<Button variant='secondary' onClick={props.onClose}>
					Close
				</Button>
				<Button variant='danger' onClick={props.onClose} disabled={!hasItems}>
					Proceed to checkout
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
