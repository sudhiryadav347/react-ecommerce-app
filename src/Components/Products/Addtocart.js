import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Addtocart extends Component {

    constructor(props){
        super(props);
        this.state = {label: 'Add to Cart', counter: 1 };
    }


  AddedToCart(param) {
    this.setState((prevState) => ({ label: param, counter: +1 }));
    const resetAddtoCartBtn = setTimeout(()=>{ this.setState({label: 'Add to Cart'})}, 1000);
    this.props.itemsCounter(this.state.counter);
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
