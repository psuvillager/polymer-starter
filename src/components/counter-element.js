import { LitElement, html, css } from 'lit-element';

// Elements needed
import { plusIcon, minusIcon } from './my-icons.js';

// Styles needed
import { ButtonSharedStyles } from './button-shared-styles.js';


// This is a reusable element. It is not connected to the store. (It could just as well be a third-party element.)
class CounterElement extends LitElement {
  
  static get properties() {
    return {
      clicks: { type: Number }, /* Total number of clicks received */
      value: { type: Number } /* Current value */
    }
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        span { width: 20px; display: inline-block; text-align: center; font-weight: bold; }
      `
    ];
  }

  render() {
    return html`
      <div>
        <p>
          Clicked <span>${this.clicks}</span> times
          Value is <span>${this.value}</span>
          <button @click="${this._onIncrement}" title="Add 1">${plusIcon}</button>
          <button @click="${this._onDecrement}" title="Subtract 1">${minusIcon}</button>
        </p>
      </div>
    `;
  }

  constructor() {
    super();
    this.clicks = 0;
    this.value = 0;
  }

  _onIncrement() {
    this.value++;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-incremented'));
  }

  _onDecrement() {
    this.value--;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-decremented'));
  }
}

window.customElements.define('counter-element', CounterElement);
