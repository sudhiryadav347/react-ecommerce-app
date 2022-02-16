import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import Productrow from './Components/Products/Productrow';
import Product from './Components/Products/Product';
import Cartcounter from './Components/UI/Cartcounter';
// import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Container className="p-3">
          <Row>
            <Col lg="10" className="logo-wrapper">
              <h1 className="header mb-0">React-Bootstrap</h1>
              <p className=" small text-muted">
                React.js Project Using Bootstrap - Sudhir
              </p>
            </Col>
            <Col className="cart-counter d-flex align-items-center justify-content-end">
              <Cartcounter itemCount="0" />
            </Col>
          </Row>
          {/* Navbar starts*/}
        </Container>

        <Navbar bg="light" expand="lg" className="my-3">
          <Container>
            {/* <Navbar.Brand href="#home">Bootstrap React</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* Navbar ends */}
      </header>

      <body>
        <Container>
          <Product />
        </Container>
      </body>
    </div>
  );
};

export default App;
