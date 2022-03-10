import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Cart from "./Components/Cart/Cart";
import Navigationbar from "./Components/UI/NavigationBar";
import Logo from "./Components/UI/Logo";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Pagenotfound from "./Components/Pagenotfound";
import Signup from "./Components/Signup";
import AuthContext from "./Components/Context/auth-context";
import HeaderCounter from "./Components/HeaderCounter/HeaderCounter";
import CartProvider from "./Components/Context/CartProvider";

const App = () => {

	const [ShowCart, setShowCart] = useState(false);
	const authCTX = useContext(AuthContext);

	const handleShow = () => {
		setShowCart(true);
	};

	const handleClose = () => {
		setShowCart(false)
	}

	return (
		<CartProvider>
			<header className='App-header'>
				<Container className='p-3'>
					<Row>
						<Logo />
						<HeaderCounter onClick={ handleShow }/>
						<Cart cartDisplay={ShowCart} onClose={handleClose}/>
					</Row>
				</Container>
			</header>
			<Navigationbar />
			<Container className='pt-4'>
				<Routes>
					<Route path='about' element={<About />} />
					<Route
						path='/'
						element={<Home />}
					/>
					{!authCTX.isLoggedIn && (
						<>
							<Route path='login' element={<Login />} />
							<Route path='signup' element={<Signup />} />
							<Route
								path='/dashboard'
								element={<Navigate replace to='/login' />}
							/>
						</>
					)}
					{authCTX.isLoggedIn && (
						<Route path='/dashboard' element={<Dashboard />} />
					)}
					<Route path='*' element={<Pagenotfound />} />
				</Routes>
			</Container>
		</ CartProvider>
	);
};

export default App;
