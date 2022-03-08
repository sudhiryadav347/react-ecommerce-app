import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
	token: "",
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (token) => {},
});

// Create a function to calculate remaining time to expire the token and trigger logout.
const calculateRemainingTime = (expirationTime) => {
	// get current time in milliseconds.
	const currentTime = new Date().getTime();

	// get the expiration time received and convert it in milliseconds too.
	const adjExpirationTime = new Date(expirationTime).getTime();

	// calculate the remaining time.
	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const retrieveStoredToken = () => {

	// get the token if its valid otherwise delete it.
	const storedToken = localStorage.getItem("token");
	const storedExpirationDate = localStorage.getItem("expirationTime");

	const remainingTime = calculateRemainingTime(storedExpirationDate);

	if (remainingTime <= 3600) {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		return null;
	}

	// return if the token is valid and also return updated expiration time.
	return {
		token: storedToken,
		duration: remainingTime,
	};
};

export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();

	let initialToken;

	// if already a token then set the initial token to retrieved token otherwise initial token will remain undefined which is ok for us to be in 
	// our initial state.
	if (tokenData) {
		initialToken = tokenData.token;
	}

	// We also want to set the timer for the token and for that we can not refer to the logoutHandler because its defined
	// after this so we will use the useEffect.

	const [token, setToken] = useState(initialToken);

	const userIsLoggedIn = !!token;

	// we are using use callback to make sure that this does not run unnecessarily and create an inifinite loop as its referenced
	// as dependency in useEffect hook.
	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");

		// if user logs out manually then we are going to check if logoutTime is set and clear that timeout.
		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);
	

	// don't just expect the token but also the expiration time. We get the expiration time in response already.
	// https://firebase.google.com/docs/reference/rest/auth?authuser=0#section-sign-in-email-password
	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem("token", token);
		localStorage.setItem("expirationTime", expirationTime);

		// calculate the remaining time from the time received from the server in response.
		const remainingTime = calculateRemainingTime(expirationTime);

		// set the timer to callback logout handler
		// Test if logout happens in 3000 milliseconds (3 seconds.)
		// setTimeout( logoutHandler, 3000);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		if (tokenData){

			// we can test by logging the tokenData.duration and with every refresh the duration will be shorter.
			console.log(tokenData.duration);
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	  }, [tokenData, logoutHandler]);

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
