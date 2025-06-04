export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id
              ? { ...x, qty: x.qty + item.qty } // Accumulate quantity
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }

    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };

    case 'CART_UPDATE_ITEM_QTY': {
      const { id, qty } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x._id === id ? { ...x, qty } : x
        ),
      };
    }

    default:
      return state;
  }
};
