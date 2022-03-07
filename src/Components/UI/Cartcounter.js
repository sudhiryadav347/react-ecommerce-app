import React, { Component } from 'react';
import {
  Col,
  Modal,
  Nav,
  Button,
  Container,
  Row,
  Image,
} from 'react-bootstrap';
import styles from './CartCounter.module.css';

class Cartcounter extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      cart: [],
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () =>{
    this.setState({
      show: true,
      cart: JSON.parse(localStorage.getItem('cart')),
    });
  }

  render() {
    return (
      <Col className="cart-counter d-flex align-items-center justify-content-end">
        <span className="align-middle">
          <div className="fs-6">
            <Nav.Link
              onClick={this.handleShow}
              className="position-relative p-0"
              disabled={(this.props.itemCount === 0) && true}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-basket me-2 link-dark"
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"></path>
              </svg>
              { (this.props.itemCount > 0) && (
              <span
                className={`position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle ${styles.badge}`}
              >
                <span style={{ color: '#fff' }}>{this.props.itemCount}</span>
              </span>
              )}
            </Nav.Link>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              centered
              fullscreen
            >
              <Modal.Header closeButton>
                <Container>
                  <Row>
                    <Modal.Title className="ps-5">Shopping Cart.</Modal.Title>
                  </Row>
                </Container>
              </Modal.Header>
              <Modal.Body className="show-grid p-0">
                <Container>
                  <table className="table cart-table mt-5">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.cart.map((item) => {
                        return (
                          <tr>
                            <th scope="row">
                              <Image
                                src={item.image}
                                className={styles.thumbnail}
                              ></Image>
                            </th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                          </tr>
                        );
                      })}      
                      {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr> */}
                    </tbody>
                    <tfoot className={styles.FinalRow}>
                      <tr>
                        <td>Footer</td>
                        <td>Footer</td>
                        <td>Footer</td>
                        <td>Footer</td>
                      </tr>
                    </tfoot>
                  </table>
                </Container>
              </Modal.Body>
              <Modal.Footer className='container'>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                  </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </span>
      </Col>
    );
  }
}

export default Cartcounter;
