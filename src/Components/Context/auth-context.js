import React, { useState } from "react";

const AuthContext = React.createContext({
	token: "",
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (token) => {},
});

export const AuthContextProvider = (props) => {

	const [token, setToken] = useState(null);

	const userIsLoggedIn = !!token;

	const loginHandler = (token) => {
		setToken(token);
	};

	const logoutHandler = () => {
		setToken(null);
	};


	return (
		<AuthContext.Provider
			value={{
				token: token,
				isLoggedIn: userIsLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
