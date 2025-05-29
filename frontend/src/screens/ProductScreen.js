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
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

function ProductScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(slug));
  }, [dispatch, slug]);

  const addToCartHandler = () => {
    console.log('Add to Cart clicked:', product?._id, qty);
    if (product && product._id) {
      navigate(`/cart/${product._id}?qty=${qty}`);
    }
  };

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

  return (
    <>
      {console.log('🔍 Current product:', product)}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={product.image}
                alt={product.name}
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
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
                            <Col>
                              <Form.Select
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button
                              variant="primary"
                              onClick={addToCartHandler}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </ListGroup.Item>
                      </>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default ProductScreen;
