import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../Context/auth-context";

const Navigationbar = (props) => {

	const ctx = useContext(AuthContext);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink to="/" className="nav-link">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/about" className="nav-link">
								About
							</NavLink>
						</li>
					</ul>

					<ul className="navbar-nav me-4 mb-2 mb-lg-0">
						{ctx.isLoggedIn ? (
							<React.Fragment>
								<li className="nav-item">
									<NavLink to="/dashboard" className="nav-link">
										Dashboard
									</NavLink>
								</li>

								<li className="nav-item">
									<NavLink to="/" className="nav-link" onClick={ctx.onLogout}>
										Logout
									</NavLink>
								</li>
							</React.Fragment>
						) : (
							<li className="nav-item">
								<NavLink to="/login" className="nav-link">
									Login
								</NavLink>
							</li>
						)}
					</ul>

					<form className="d-flex">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navigationbar;
