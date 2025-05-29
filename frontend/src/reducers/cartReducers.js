export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      const cartItems = existItem
        ? state.cartItems.map((x) => (x._id === existItem._id ? item : x))
        : [...state.cartItems, item];

      return { ...state, cartItems };

    default:
      return state;
  }
};
