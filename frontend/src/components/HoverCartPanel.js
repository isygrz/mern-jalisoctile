import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../index.css';

export default function HoverCartPanel() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((a, c) => a + c.qty, 0);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div
      className="hover-cart-container"
      onMouseEnter={() => setShowPanel(true)}
      onMouseLeave={() => setShowPanel(false)}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <div className="cart-icon" aria-label="Shopping Cart">
        🛒
        {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
      </div>

      {showPanel && (
        <div className="cart-hover-panel">
          <div className="fw-bold text-center mb-2">Shopping Cart</div>

          {cartItems.length === 0 ? (
            <div className="text-center text-muted">Cart is Empty</div>
          ) : (
            <>
              {cartItems.slice(0, 5).map((item) => (
                <div className="d-flex align-items-start mb-2" key={item._id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      marginRight: '10px',
                    }}
                  />
                  <div className="flex-grow-1">
                    <div style={{ fontSize: '0.9rem' }}>
                      {item.isSample ? '(Sample) ' : ''}
                      {item.name}
                    </div>
                    <div className="text-muted small">
                      {item.qty} × $
                      {((item.samplePrice ?? item.price) || 0).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center mt-2">
                <Link to="/cart" className="btn btn-sm btn-outline-primary">
                  View Full Cart
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
