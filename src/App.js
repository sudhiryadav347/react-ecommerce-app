import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Cartcounter from "./Components/UI/Cartcounter";
import Navigationbar from "./Components/UI/NavigationBar";
import Logo from "./Components/UI/Logo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

const App = () => {
	const [IsLoggedIn, setIsLoggedIn] = useState(false);

	const [isValidLogin, setisValidLogin] = useState(true);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
		if (storedUserLoggedInInformation === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	const [cartCount, setcartCount] = useState(0);

	const cartContentCounterHandler = (data) => {
		setcartCount(data);
	};

	const loginHandler = (email, password) => {
		if (email === "sudhir@gmail.com" && password === "1234567") {
			localStorage.setItem("isLoggedIn", "1");
			setIsLoggedIn(true);
			setisValidLogin(true);
		} else {
			setisValidLogin(false);
		}
	};

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};

	return (
		<React.Fragment>
			<header className="App-header">
				<Container className="p-3">
					<Row>
						<Logo />
						<Cartcounter itemCount={cartCount} />
					</Row>
				</Container>
			</header>

			<BrowserRouter>
				<Navigationbar onLogout={logoutHandler} whetherLoggedIn={IsLoggedIn} />
				<body>
					<Container className="pt-4">
						<Routes>
							<Route path="about" element={<About />} />
							<Route
								path="/"
								element={
									<Home cartContentCounter={cartContentCounterHandler} />
								}
							/>
							<Route
								path="login"
								element={
									<Login onLogin={loginHandler} showAlert={isValidLogin} />
								}
							/>
							<Route path="dashboard" element={<Dashboard />} />
						</Routes>
					</Container>
				</body>
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
