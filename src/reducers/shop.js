import { GET_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../actions/shop.js';
import { createSelector } from 'reselect';

const INITIAL_STATE = {
  products: {},
  cart: {},
  error: ''
};

const shop = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case GET_PRODUCTS:
      return { ...state, products: action.products };

    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case CHECKOUT_SUCCESS:
      return { ...state, products: products(state.products, action), cart: cart(state.cart, action), error: '' };

    case CHECKOUT_FAILURE:
      return { ...state, error: 'Checkout failed. Please try again' };

    default:
      return state;
  }
};

//
// Slice reducer: it only reduces the bit of the state it's concerned about.
//
const products = (state, action) => {
  switch (action.type) {

    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      const productId = action.productId;
      return { ...state, productId]: product(state[productId], action) };

    default:
      return state;
  }
};

const product = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: return { ...state, inventory: state.inventory - 1 };
    case REMOVE_FROM_CART: return { ...state, inventory: state.inventory + 1 };
    default: return state;
  }
};

const cart = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addId = action.productId;
      return { ...state, [addId]: (state[addId] || 0) + 1 };
    case REMOVE_FROM_CART:
      const removeId = action.productId;
      const quantity = (state[removeId] || 0) - 1;
      if (quantity <= 0) { const newState = { ...state }; delete newState[removeId]; return newState; }
      else { return { ...state, [removeId]: quantity } }
    case CHECKOUT_SUCCESS: return {};
    default: return state;
  }
};

export default shop;

// Per Redux best practices, the shop data is structured for efficiency (small size and fast updates).
//
// The _selectors_ below transform store data into specific forms that are tailored for presentation.
// Putting this logic here keeps the app's layers loosely coupled -- views don't care about the store's data structures.
// The tiny `reselect` library creates efficient selectors. (See https://github.com/reduxjs/reselect).

const cartSelector = state => state.shop.cart;
const productsSelector = state => state.shop.products;

// Returns a flattened array representation of the items in the cart
export const cartItemsSelector = createSelector(
  cartSelector,
  productsSelector,
  (cart, products) => {
    return Object.keys(cart).map(id => {
      const item = products[id];
      return { id: item.id, title: item.title, amount: cart[id], price: item.price };
    });
  }
);

// Returns total cost of items in cart
export const cartTotalSelector = createSelector(
  cartSelector,
  productsSelector,
  (cart, products) => {
    let total = 0;
    Object.keys(cart).forEach(id => { const item = products[id]; total += item.price * cart[id]; });
    return Math.round(total * 100) / 100;
  }
);

// Returns quantity of items in cart
export const cartQuantitySelector = createSelector(
  cartSelector,
  cart => { let num = 0; Object.keys(cart).forEach(id => { num += cart[id]; }); return num; }
);
