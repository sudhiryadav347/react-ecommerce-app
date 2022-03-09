import React from "react";
import { Col, Image } from "react-bootstrap";

const Logo = () => {
	return (
		<Col lg="10" className="logo-wrapper">
			{/* <h1 className="header mb-0">React-Commerce</h1>
			<p className=" small text-muted">
				React.js Project Using Bootstrap - Sudhir
			</p> */}
			<Image src="./logo.png" className="w-25"/>
		</Col>
	);
};

export default Logo;
