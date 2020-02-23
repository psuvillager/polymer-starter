import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// Is connected to the Redux store
import { store } from '../store.js';

// Elements needed
import { removeFromCartIcon } from './my-icons.js';
import './shop-item.js';

// Actions needed
import { removeFromCart } from '../actions/shop.js';

// Reducers needed
import { cartItemsSelector, cartTotalSelector } from '../reducers/shop.js';

// Styles needed
import { ButtonSharedStyles } from './button-shared-styles.js';

class ShopCart extends connect(store)(LitElement) {

  static get properties() {
    return {
      _items: { type: Array },
      _total: { type: Number }
    };
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        :host { display: block; }
      `
    ];
  }

  render() {
    return html`
      <p ?hidden="${this._items.length !== 0}">Please add some products to cart.</p>
      ${this._items.map((item) =>
        html`
          <div>
            <shop-item .name="${item.title}" .amount="${item.amount}" .price="${item.price}"></shop-item>
            <button
                @click="${this._removeButtonClicked}"
                data-index="${item.id}"
                title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
        `
      )}
      <p ?hidden="${!this._items.length}"><b>Total:</b> ${this._total}</p>
    `;
  }

  _removeButtonClicked(e) {
    store.dispatch(removeFromCart(e.currentTarget.dataset['index']));
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }
}

window.customElements.define('shop-cart', ShopCart);
