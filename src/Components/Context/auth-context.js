import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";


const AuthContext = React.createContext({
	isLoggedIn: false,
	isCorrectLogin: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {

	const [IsLoggedIn, setIsLoggedIn] = useState(false);
	const [isValidLogin, setisValidLogin] = useState(true);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
		if (storedUserLoggedInInformation === "1") {
			setIsLoggedIn(true);
		}
	}, []);

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
		<AuthContext.Provider
			value={{
				isLoggedIn: IsLoggedIn,
				isCorrectLogin: isValidLogin,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
