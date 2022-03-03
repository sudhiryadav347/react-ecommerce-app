import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Cartcounter from "./Components/UI/Cartcounter";
import Navigationbar from "./Components/UI/NavigationBar";
import Logo from "./Components/UI/Logo";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Pagenotfound from "./Components/Pagenotfound";

const App = () => {
	const [cartCount, setcartCount] = useState(0);
	const cartContentCounterHandler = (data) => {
		setcartCount(data);
	};

	return (
		<React.Fragment>
			<header className='App-header'>
				<Container className='p-3'>
					<Row>
						<Logo />
							<Cartcounter itemCount={cartCount} />
					</Row>
				</Container>
			</header>
			<Navigationbar />
			<body>
				<Container className='pt-4'>
					<Routes>
						<Route path='about' element={<About />} />
						<Route
							path='/'
							element={<Home cartContentCounter={cartContentCounterHandler} />}
						/>
						<Route path='login' element={<Login />} />
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='*' element={<Pagenotfound />} />
					</Routes>
				</Container>
			</body>
		</React.Fragment>
	);
};

export default App;
