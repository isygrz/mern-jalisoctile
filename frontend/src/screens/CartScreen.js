import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import { removeFromCart, updateCartQuantity } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import Breadcrumbs from '../components/Breadcrumbs'; // ✅ Optional if implemented

export default function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const updateQuantity = (item, qty) => {
    dispatch(updateCartQuantity(item._id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  const getItemPrice = (item) =>
    typeof item.samplePrice === 'number' ? item.samplePrice : item.price;

  const subtotal = cartItems.reduce((a, c) => {
    const price = getItemPrice(c);
    return a + (typeof price === 'number' ? price * c.qty : 0);
  }, 0);

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <Breadcrumbs extraCrumbs={[{ path: '/cart', label: 'Cart' }]} />

      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              <div className="text-center">
                <strong>Your cart is empty</strong>
                <div className="mt-3">
                  <Link to="/" className="btn btn-outline-primary">
                    Browse Products
                  </Link>
                </div>
              </div>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item, index) => {
                const price = getItemPrice(item);
                return (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-muted">{index + 1}.</span>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail"
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                            }}
                          />
                          <div>
                            {item.isSample ? (
                              <span className="fw-bold fst-italic">
                                (Sample) {item.name}
                              </span>
                            ) : (
                              <Link
                                to={`/product/${item.slug}`}
                                className="fw-bold text-decoration-none"
                              >
                                {item.name}
                              </Link>
                            )}
                          </div>
                        </div>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="d-flex align-items-center">
                          {/* Mobile minus button */}
                          <div className="d-flex d-md-none">
                            <Button
                              variant="light"
                              onClick={() => updateQuantity(item, item.qty - 1)}
                              disabled={item.qty <= 1}
                            >
                              <i className="fas fa-minus" />
                            </Button>
                          </div>

                          {/* Quantity input */}
                          <Form.Control
                            type="number"
                            value={item.qty}
                            min={1}
                            max={item.countInStock}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (value >= 1 && value <= item.countInStock) {
                                updateQuantity(item, value);
                              }
                            }}
                            style={{
                              width: '70px',
                              textAlign: 'center',
                              margin: '0 0.5rem',
                            }}
                          />

                          {/* Mobile plus button */}
                          <div className="d-flex d-md-none">
                            <Button
                              variant="light"
                              onClick={() => updateQuantity(item, item.qty + 1)}
                              disabled={item.qty >= item.countInStock}
                            >
                              <i className="fas fa-plus" />
                            </Button>
                          </div>
                        </Form.Group>

                        {item.qty === item.countInStock && (
                          <>
                            <div className="text-danger small mt-1">
                              Only {item.countInStock} in stock
                            </div>
                            <div className="alert alert-info mt-1 p-2 small">
                              Ordering in bulk?{' '}
                              <Link to="/contact">
                                Contact our wholesale team
                              </Link>
                              .
                            </div>
                          </>
                        )}
                      </Col>

                      <Col md={3}>
                        ${typeof price === 'number' ? price.toFixed(2) : 'N/A'}
                      </Col>

                      <Col md={2}>
                        <Button
                          variant="light"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
                    ${subtotal.toFixed(2)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
