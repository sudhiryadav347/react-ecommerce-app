import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navigationbar = (props) => {
	return (
		<>
			{/* Navbar starts*/}
			<Navbar bg="light" expand="lg" className="my-3">
				<Container>
					{/* <Navbar.Brand href="#home">Bootstrap React</Navbar.Brand> */}
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link>
								<NavLink to="/">Home</NavLink>
							</Nav.Link>
							<Nav.Link>
								<NavLink to="/about">About</NavLink>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>

					<Nav className="me-auto className='align-right'">
						{props.whetherLoggedIn ? (
							<Nav.Link onClick={props.onLogout}>
								<NavLink to="/">Logout</NavLink>
								<NavLink to="/dashboard">Dashboard</NavLink>
							</Nav.Link>
						) : (
							<Nav.Link>
								<NavLink to="/login">Login</NavLink>
							</Nav.Link>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigationbar;
