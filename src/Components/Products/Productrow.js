import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

class Productrow extends Component {

    render(props) {
        return (
                <Row className="my-5">
                    { this.props.children }
          </Row>
        );
    }
}

export default Productrow;
