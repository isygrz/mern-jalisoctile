import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Fetch products on mount
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Immediately update tab title
  useEffect(() => {
    document.title = 'Jalisco Tile';
  }, []);

  return (
    <div>
      <Helmet>
        <title>Jalisco Tile</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products
              .filter((product) => !product.isSample) // ✅ Only filter for display
              .map((product) => (
                <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product} allProducts={products} />{' '}
                  {/* ✅ Pass full list */}
                </Col>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}
