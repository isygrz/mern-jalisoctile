import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
// import { Helmet } from 'react-helmet-async';

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // Dispatch product details action
  useEffect(() => {
    console.log('📦 Dispatching detailsProduct for slug:', slug);
    dispatch(detailsProduct(slug));
  }, [dispatch, slug]);

  // Log product name after successful load
  useEffect(() => {
    if (!loading && !error && product?.name) {
      console.log('✅ Product loaded:', product.name);
    }
  }, [loading, error, product]);

  // Log the full product object every time it updates
  useEffect(() => {
    console.log('🔍 Redux product state changed:', product);
  }, [product]);

  // 🛠 Manually update tab title for reliable results
  useEffect(() => {
    if (product?.name && !loading && !error) {
      const dynamicTitle = `${product.name} | Jalisco Tile`;
      document.title = dynamicTitle;
      console.log('🛠 Manually set document.title to:', dynamicTitle);
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
      {/* <Helmet key={product?.name || 'default'}>
        <title>
          {product?.name && !loading && !error
            ? `${product.name} | Jalisco Tile`
            : loading
            ? 'Loading... | Jalisco Tile'
            : error
            ? 'Error | Jalisco Tile'
            : 'Product Details | Jalisco Tile'}
        </title>
      </Helmet> */}

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
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button variant="primary">Add to Cart</Button>
                        </div>
                      </ListGroup.Item>
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
