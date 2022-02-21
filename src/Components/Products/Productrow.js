import React, { Component } from "react";
import { Row } from "react-bootstrap";
import Masonry from "react-masonry-css";
import './ProductRow.css';

class Productrow extends Component {
	render(props) {
		return (
			// <Row>
			// 	{this.props.children}
			// </Row>
			<Masonry
				breakpointCols={4}
				className="my-masonry-grid card-group"
				columnClassName="my-masonry-grid_column"
			>
				{this.props.children}
			</Masonry>
		);
	}
}

export default Productrow;
