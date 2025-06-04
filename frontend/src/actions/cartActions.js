import axios from 'axios';

// Utility to persist cart state
const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const addToCart =
  (productId, qty, options = {}) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);

    const isSample = options.isSample || false;
    const priceToUse =
      typeof options.samplePrice === 'number'
        ? options.samplePrice
        : data.price;

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _id: data._id,
        name: options.name || data.name,
        slug: options.slug || data.slug,
        image: options.image || data.image,
        price: priceToUse,
        countInStock: data.countInStock,
        qty,
        isSample,
        samplePrice: options.samplePrice,
        isSampleOf: options.isSampleOf,
      },
    });

    saveCartToStorage(getState().cart.cartItems);
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: id,
  });

  saveCartToStorage(getState().cart.cartItems);
};

export const updateCartQuantity = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: 'CART_UPDATE_ITEM_QTY',
    payload: { id, qty },
  });

  saveCartToStorage(getState().cart.cartItems);
};
