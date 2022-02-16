import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Addtocart from './Addtocart';
import Productrow from './Productrow';

class Product extends Component {
  constructor(props) {
    super();
  }

  ProductData = [
    {
      title: 'Product Title One',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      price: '10',
      stock: '900',
      image: 'product-1.jpeg',
    },
    {
      title: 'Product Title Two',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      price: '13.20',
      stock: '21',
      image: 'product-2.jpeg',
    },
    {
      title: 'Product Title Three',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      price: '14.90',
      stock: '232',
      image: 'product-3.jpeg',
    },
    {
      title: 'Product Title Four',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      price: '9.02',
      stock: '53',
      image: 'product-4.jpeg',
    },
  ];
  productImageLocation = 'Assets/Images/';

  render() {
    return (
      <Productrow>
        {
          // Using array.map to iterate through product data.
          this.ProductData.map(product => (
            <Col>
              <Card style={{ width: 'auto' }}>
                <Card.Img
                  variant="top"
                  src={this.productImageLocation + product.image}
                  alt=""
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Addtocart />
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Productrow>
    );
  }
}

export default Product;
