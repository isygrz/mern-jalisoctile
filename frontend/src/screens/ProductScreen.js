import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Button,
  Form,
} from 'react-bootstrap';
import axios from 'axios';

import { detailsProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Breadcrumbs from '../components/Breadcrumbs'; // ✅ optional if implemented

export default function ProductScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [adding, setAdding] = useState(false);
  const [stockError, setStockError] = useState('');

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(detailsProduct(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (product?.name && !loading && !error) {
      document.title = `${product.name} | Jalisco Tile`;
    } else if (loading) {
      document.title = 'Loading... | Jalisco Tile';
    } else if (error) {
      document.title = 'Error | Jalisco Tile';
    } else {
      document.title = 'Product Details | Jalisco Tile';
    }
  }, [product?.name, loading, error]);

  const addToCartHandler = async () => {
    if (!product?._id) return;

    setAdding(true);
    setStockError('');
    try {
      await axios.post('/api/cart', { productId: product._id, qty });
      await dispatch(addToCart(product._id, qty));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 5000);
    } catch (err) {
      setStockError(err.response?.data?.message || 'Error adding to cart');
    } finally {
      setAdding(false);
    }
  };

  const renderQuantityInput = () => (
    <Form.Group className="d-flex align-items-center">
      <div className="d-flex d-md-none">
        <Button
          variant="light"
          onClick={() => qty > 1 && setQty(qty - 1)}
          disabled={qty <= 1}
        >
          <i className="fas fa-minus" />
        </Button>
      </div>

      <Form.Control
        type="number"
        value={qty}
        min={1}
        max={product.countInStock}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 1 && value <= product.countInStock) {
            setQty(value);
            setStockError('');
          } else if (e.target.value === '') {
            setQty('');
          }
        }}
        style={{ width: '70px', textAlign: 'center', margin: '0 0.5rem' }}
      />

      <div className="d-flex d-md-none">
        <Button
          variant="light"
          onClick={() => qty < product.countInStock && setQty(qty + 1)}
          disabled={qty >= product.countInStock}
        >
          <i className="fas fa-plus" />
        </Button>
      </div>
    </Form.Group>
  );

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <div className="d-flex justify-content-center mt-3">
      <MessageBox variant="danger" className="text-center">
        {error}
      </MessageBox>
    </div>
  ) : (
    <div>
      {/* ✅ Breadcrumb trail if implemented */}
      <Breadcrumbs
        extraCrumbs={[
          { path: `/product/${product.slug}`, label: product.name },
        ]}
      />

      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>{renderQuantityInput()}</Col>
                      </Row>
                    </ListGroup.Item>

                    {qty === product.countInStock && (
                      <>
                        <ListGroup.Item>
                          <div className="text-center w-100 alert alert-warning mb-2">
                            Requested amount exceeds current stock!
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="text-center w-100 alert alert-info">
                            Ordering in bulk? Contact our{' '}
                            <a href="/contact">Wholesale Team</a> for
                            assistance.
                          </div>
                        </ListGroup.Item>
                      </>
                    )}

                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          onClick={addToCartHandler}
                          disabled={adding}
                        >
                          {adding ? 'Adding...' : 'Add to Cart'}
                        </Button>
                      </div>

                      {stockError && (
                        <div className="d-flex justify-content-center mt-3">
                          <MessageBox variant="danger" className="text-center">
                            {stockError}
                          </MessageBox>
                        </div>
                      )}

                      {addedToCart && (
                        <>
                          <div className="d-flex justify-content-center mt-3">
                            <MessageBox
                              variant="success"
                              className="text-center"
                            >
                              Item(s) added to cart!
                            </MessageBox>
                          </div>
                          <div className="d-grid mt-2">
                            <Button
                              variant="outline-primary"
                              onClick={() => navigate('/cart')}
                            >
                              View Your Cart
                            </Button>
                          </div>
                        </>
                      )}
                    </ListGroup.Item>
                  </>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
