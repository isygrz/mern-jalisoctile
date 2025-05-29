import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen() {
  const { id: productId } = useParams();
  const { search } = useLocation(); // ✅ Called unconditionally

  const queryParams = new URLSearchParams(search);
  const qty = queryParams.get('qty') ? Number(queryParams.get('qty')) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // ✅ Dispatch the action when productId is available
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <MessageBox>YOUR SHOPPING CART IS EMPTY</MessageBox>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.name} - Qty: {item.qty}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
