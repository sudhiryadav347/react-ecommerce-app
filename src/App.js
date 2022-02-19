import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Product from './Components/Products/Product';
import Cartcounter from './Components/UI/Cartcounter';
import Navigationbar from './Components/UI/NavigationBar';
import Logo from './Components/UI/Logo';
import Userlogin from './Components/UserLogin';
import Statictextblock from './Components/StaticTextBlock';

const App = () => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [isValidLogin, setisValidLogin] = useState(true);
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);
  const [cartCount, setcartCount] = useState(0);
  const cartContentCounterHandler = (data) => {
    setcartCount(data);
  };

  const loginHandler = (email, password) => {
    if (email === 'sudhir@gmail.com' && password === '1234567') {
      localStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
      setisValidLogin(true);
    } else {
      setisValidLogin(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <header className="App-header">
        <Container className="p-3">
          <Row>
            <Logo />
            {IsLoggedIn && <Cartcounter itemCount={cartCount} />}
          </Row>
        </Container>

        <Navigationbar onLogout={logoutHandler} whetherLoggedIn={IsLoggedIn}/>
      </header>

      <body>
        <Container>
          {IsLoggedIn && (
            <Product cartContentCounter={cartContentCounterHandler} />
          )}
          {!IsLoggedIn && (
            <Row>
              <Statictextblock />
              <Userlogin onLogin={loginHandler} showAlert={isValidLogin}/>
            </Row>
          )}
        </Container>
      </body>
    </React.Fragment>
  );
};

export default App;
