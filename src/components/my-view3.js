import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// Is connected to the Redux store
import { store } from '../store.js';

// Actions needed
import { checkout } from '../actions/shop.js';

// Lazy-loads the shop reducer
import shop, { cartQuantitySelector } from '../reducers/shop.js';
store.addReducers({ shop });

// Elements needed
import './shop-products.js';
import './shop-cart.js';

// Styles needed
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';

class MyView3 extends connect(store)(PageViewElement) {

  static get properties() {
    return {
      // The data from the store
      _quantity: { type: Number },
      _error: { type: String }
    };
  }

  static get styles() {
    return [
      SharedStyles,
      ButtonSharedStyles,
      css`
        button { border: 2px solid var(--app-dark-text-color); border-radius: 3px; padding: 8px 16px; }
        button:hover { border-color: var(--app-primary-color); color: var(--app-primary-color); }
        .cart, .cart svg { fill: var(--app-primary-color); width: 64px; height: 64px; }
        .circle.small { margin-top: -72px; width: 28px; height: 28px; font-size: 16px; font-weight: bold; line-height: 30px; }
      `
    ];
  }

  render() {
    return html`
      <section>
        <h2>Redux example: shopping cart</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${this._quantity}</div></div>
        <p>This slightly more advanced Redux example simulates a shopping cart: 
           getting products, adding/removing cart items, checkout (with random failure to simulate failure handling)
           This view and its <code>&lt;shop-products&gt;</code> and <code>&lt;shop-cart&gt;</code> are all connected 
           to the Redux store.
        </p>
      </section>
      
      <section>
        
        <h3>Products</h3>
        <shop-products></shop-products>
        <br>

        <h3>Your Cart</h3>
        <shop-cart></shop-cart>

        <div>${this._error}</div>
        <br>

        <p>
          <button ?hidden="${this._quantity == 0}" @click="${this._checkoutButtonClicked}"> Checkout </button>
        </p>

      </section>
    `;
  }

  _checkoutButtonClicked() {
    store.dispatch(checkout());
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._quantity = cartQuantitySelector(state);
    this._error = state.shop.error;
  }
}

window.customElements.define('my-view3', MyView3);
