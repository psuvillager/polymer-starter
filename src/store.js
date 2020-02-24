import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import app from './reducers/app.js';

// Sets up a Chrome extension for time travel debugging. (See https://github.com/zalmoxisus/redux-devtools-extension)
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes store w/ lazyReducerEnhancer (for lazily adding reducers after store creation) and redux-thunk (for dispatching async actions)
// (See: https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management)
export const store = createStore(
  state => state,
  devCompose( lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

// Initially loaded reducers
store.addReducers({ app });
