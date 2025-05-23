import { Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
//import { LinkContainer } from 'react-router-bootstrap';
//import logo from './logo.svg';
//import './App.css';
//import data from './data';

function App() {
  return (
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
        <Container>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
