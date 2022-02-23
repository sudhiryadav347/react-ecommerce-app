import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rate = (props) => {
	const ratingStars = [];

	for (let i = props.value; i > 0; i -= 1) {
		if (i >= 0.5) {
			ratingStars.push(<FaStar />);
		} else {
			ratingStars.push(<FaStarHalfAlt />);
		}
	}

	return <div style={{ color: "#ffb100" }}>{ratingStars}</div>;
};

export default Rate;
