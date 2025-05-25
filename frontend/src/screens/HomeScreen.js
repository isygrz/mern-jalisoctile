import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
//import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// import axios from 'axios';
// import data from '../data';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // ✅ Set browser tab title when user returns to home
  useEffect(() => {
    document.title = 'Jalisco Tile';
    console.log('🏠 Set document.title to: Jalisco Tile');
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {/*<Helmet key="home">
            <title>Jalisco Tile</title>
          </Helmet>*/}
          <h1>Featured Products</h1>
          <div className="products">
            <Row>
              {products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </div>
  );
}
