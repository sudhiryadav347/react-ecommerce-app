import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Addtocart from "./Addtocart";
import Productrow from "./Productrow";
import axios from "axios";


const InitProductData = [
	{
		title: "Product Title One",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "10",
		stock: "900",
		image: "product-1.jpeg",
	},
	{
		title: "Product Title Two",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "13.20",
		stock: "21",
		image: "product-2.jpeg",
	},
	{
		title: "Product Title Three",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "14.90",
		stock: "232",
		image: "product-3.jpeg",
	},
	{
		title: "Product Title Four",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "9.02",
		stock: "53",
		image: "product-4.jpeg",
	},
	{
		title: "Product Title Five",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "43.00",
		stock: "121",
		image: "placeholder-product-image-5.jpeg",
	},
	{
		title: "Product Title Six",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "21.90",
		stock: "87",
		image: "placeholder-product-image-6.jpeg",
	},
	{
		title: "Product Title Seven",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "89.76",
		stock: "32",
		image: "placeholder-product-image-7.jpeg",
	},
	{
		title: "Product Title Eight",
		description:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		price: "23.90",
		stock: "12",
		image: "placeholder-product-image-8.jpeg",
	},
];
// const productImageLocation = 'Assets/Images/';

const Product = (props) => {
	const [ProductData, setProductData] = useState(InitProductData);
	useEffect(() => {
		axios.get("https://fakestoreapi.com/products").then(function (response) {
			// handle success
			setProductData(response.data);
			console.log(response.data);
		});
		return () => {};
	}, []);

	const [itemCount, setitemCount] = useState(1);
	const itemsCounterHandler = (data) => {
		setitemCount((prevState) => {
			return prevState + data;
		});
		props.cartContentCounter(itemCount);
	};

	return (
		<Productrow>
			{
				// Using array.map to iterate through product data.
				ProductData.map((product, index) => {
					return (
					<Col key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt=""
                  className='p-5'
                />
                <Card.Body>
                  <h1 className="display-6 fs-3 text">${product.price}</h1>
                  <Card.Title>{(product.title).slice(0,20) + '...'}</Card.Title>
                  <Card.Text>{(product.description).slice(0,100) + '...'}</Card.Text>
                  <Addtocart itemsCounter={itemsCounterHandler} />
                </Card.Body>
              </Card>
            </Col>
					);
				})
			}
		</Productrow>
	);
};

export default Product;
