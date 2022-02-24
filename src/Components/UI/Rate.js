import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rate = (props) => {
	const ratingStars = [];

	for (let i = props.value; i > 0; i -= 1) {
		if (i >= 0.6) {
			ratingStars.push(<FaStar />);
		} else {
			ratingStars.push(<FaStarHalfAlt />);
		}
	}

	return (
		<ul
			style={{ color: "#ffb100", listStyle: "none", display: "inline-flex" }}
			className="p-0 ms-2"
		>
			{ratingStars.map((rating, index) => {
				return <li key={index}>{rating}</li>;
			})}
		</ul>
	);
};

export default Rate;
