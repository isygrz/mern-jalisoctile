import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MessageBox from '../components/MessageBox';
import { removeFromCart, updateCartQuantity } from '../actions/cartActions';

export default function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const updateQuantity = (item, newQty) => {
    dispatch(updateCartQuantity(item._id, newQty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  const getItemPrice = (item) =>
    typeof item.samplePrice === 'number' ? item.samplePrice : item.price;

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              <div className="text-center">
                <strong>YOUR CART IS EMPTY</strong>
                <div style={{ marginTop: '1rem' }}>
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
                        <div className="cart-item-container">
                          <div className="cart-item-index">{index + 1}.</div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail"
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
                          {/* Mobile-only minus button */}
                          <div className="d-flex d-md-none">
                            <Button
                              variant="light"
                              onClick={() => updateQuantity(item, item.qty - 1)}
                              disabled={item.qty <= 1}
                            >
                              <i className="fas fa-minus" />
                            </Button>
                          </div>

                          {/* Quantity input (visible always) */}
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

                          {/* Mobile-only plus button */}
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
                              Ordering in bulk? Contact our{' '}
                              <Link to="/contact">Wholesale Team</Link> for
                              assistance.
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
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : $
                    {cartItems
                      .reduce((a, c) => {
                        const price = getItemPrice(c);
                        return (
                          a + (typeof price === 'number' ? price * c.qty : 0)
                        );
                      }, 0)
                      .toFixed(2)}
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
