import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// Is connected to the Redux store
import { store } from '../store.js';

// Actions needed
import { increment, decrement } from '../actions/counter.js';

// Lazy-loads the `counter` reducer
import counter from '../reducers/counter.js';
store.addReducers({ counter }); 

// Elements needed
import './counter-element.js';

// Styles needed
import { SharedStyles } from './shared-styles.js';

class MyView2 extends connect(store)(PageViewElement) {

  static get properties() {
    return {
      // The data from the store.
      _clicks: { type: Number },
      _value: { type: Number }
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Redux example: simple counter</h2>
        <div class="circle">${this._value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>.
        When the element updates its counter, this page alerts the store to updates its values.
        The page also pays attention to state changes to sync the vale shown in the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element
              value="${this._value}"
              clicks="${this._clicks}"
              @counter-incremented="${this._counterIncremented}"
              @counter-decremented="${this._counterDecremented}">
          </counter-element>
        </p>
      </section>
    `;
  }

  _counterIncremented() {
    store.dispatch(increment());
  }

  _counterDecremented() {
    store.dispatch(decrement());
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._clicks = state.counter.clicks;
    this._value = state.counter.value;
  }
}

window.customElements.define('my-view2', MyView2);
