import React, { Component } from "react";
import Masonry from "react-masonry-css";
import "./ProductRow.css";

const breakpointColumnsObj = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};

class Productrow extends Component {
	render(props) {
		return (
			// using masonry https://thewebdev.info/2020/09/04/add-a-masonry-grid-to-a-react-app-with-the-react-masonry-css-library/
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid card-group"
				columnClassName="my-masonry-grid_column"
			>
				{this.props.children}
			</Masonry>
		);
	}
}

export default Productrow;
