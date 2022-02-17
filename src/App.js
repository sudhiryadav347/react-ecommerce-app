import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Row, Col } from "react-bootstrap";
import Product from "./Components/Products/Product";
import Cartcounter from "./Components/UI/Cartcounter";
import Navigationbar from "./Components/UI/NavigationBar";
import Logo from "./Components/UI/Logo";

const App = () => {
	const [cartCount, setcartCount] = useState(0);
	const cartContentCounterHandler = (data) => {
		setcartCount(data);
	};

	return (
		<React.Fragment>
			<header className="App-header">
				<Container className="p-3">
					<Row>
						<Logo />
						<Col className="cart-counter d-flex align-items-center justify-content-end">
							<Cartcounter itemCount={cartCount} />
						</Col>
					</Row>
				</Container>

				<Navigationbar />
			</header>

			<body>
				<Container>
					<Product cartContentCounter={cartContentCounterHandler} />
				</Container>
			</body>
		</React.Fragment>
	);
};

export default App;
