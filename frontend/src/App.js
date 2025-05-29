import { Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
//import { LinkContainer } from 'react-router-bootstrap';
//import logo from './logo.svg';
//import './App.css';
//import data from './data';

function App() {
  return (
    <>
      {/* Set default/fallback tab title and structure */}
      <Helmet>
        <title defaultTitle="Jalisco Tile" titleTemplate="%s | Jalisco Tile" />
      </Helmet>

      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">
                Jalisco Tile
              </Navbar.Brand>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </>
  );
}

export default App;
