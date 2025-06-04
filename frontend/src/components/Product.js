import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

function Product({ product, allProducts }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const sampleProduct = allProducts?.find(
    (p) => p.isSample && p.isSampleOf === product._id
  );

  const sampleAlreadyInCart = cartItems.some(
    (item) => item.isSample && item._id === sampleProduct?._id
  );

  const addSampleToCartHandler = () => {
    if (!sampleProduct || sampleAlreadyInCart) return;

    dispatch(
      addToCart(sampleProduct._id, 1, {
        isSample: true,
        samplePrice: sampleProduct.price,
        isSampleOf: product._id,
        name: product.name,
        slug: product.slug,
        image: product.image,
      })
    );
  };

  return (
    <Card className="product-card">
      <div className="position-relative">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>

        {/* ✅ Overlay Badge */}
        <Badge
          bg={product.countInStock > 0 ? 'success' : 'danger'}
          className="position-absolute top-0 end-0 m-2"
        >
          {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
        </Badge>
      </div>

      <Card.Body>
        <Link to={`/product/${product.slug}`} className="text-decoration-none">
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price.toFixed(2)}</Card.Text>

        {sampleProduct && (
          <div className="text-center mt-3">
            <Button
              className="sample-button"
              onClick={addSampleToCartHandler}
              disabled={sampleAlreadyInCart}
            >
              <i className="fas fa-star me-2"></i>
              <span>
                {sampleAlreadyInCart
                  ? 'Sample Already in Cart'
                  : `Add Sample – $${sampleProduct.price.toFixed(2)}`}
              </span>
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
