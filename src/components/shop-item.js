import { LitElement, html } from 'lit-element';

// This element is *not* connected to the Redux store.
class ShopItem extends LitElement {

  static get properties() {
    return {
      name: { type: String },
      amount: { type: String },
      price: { type: String }
    };
  }

  render() {
    return html`
      ${this.name}:
      <span ?hidden="${this.amount === 0}">${this.amount} * </span>
      $${this.price}
      </span>
    `;
  }
}

window.customElements.define('shop-item', ShopItem);
