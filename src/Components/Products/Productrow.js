import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

class Productrow extends Component {
    constructor(props){
        super(props);
        console.log(this.props.title);
    }

    render( ) {
        return (
                <Row className="my-5">
                    { this.props.children }
          </Row>
        );
    }
}

export default Productrow;
