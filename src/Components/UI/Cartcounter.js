import React, { Component } from 'react';

class Cartcounter extends Component {
  render() {
    return <span className="align-middle">
            Cart Items { this.props.itemCount } 
        </span>;
  }
}

export default Cartcounter;
