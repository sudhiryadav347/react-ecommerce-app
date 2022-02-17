import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Addtocart extends Component {

    constructor(props){
        super(props);
        this.state = {label: 'Add to Cart' }
        this.AddedToCart = this.AddedToCart.bind(this);

    }

  AddedToCart(param) {
    // console.log('Added to the cart! ' + params);
    // console.log(this);
    this.setState({label: param});
  }

  render() {
    return (
      <div>
          <p></p>
        <Button variant="primary" onClick={ ()=>this.AddedToCart('Added to the Cart!') }>{this.state.label}</Button>
        {/* <Button variant="primary" onClick={() => this.AddedToCart('Sudhir')}>
          Add to Cart
        </Button> */}
      </div>
    );
  }
}

export default Addtocart;
