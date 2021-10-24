/**
 * config.js
 *
 * Handle initial setup of redux store.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  participantsSlice,
  orderingSlice,
  currentSlice,
  statusSlice
} from './reducers';
import { LOCAL_STORAGE_KEY } from './constants';

/**
 * Store todo data in local storage after latest state reduce.
 *
 * @param {object} action
 * @returns {object} action
 */
const storeLocal = store => next => action => {
  const nextAction = next(action);

  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(store.getState())
  );

  return nextAction;
};

const store = configureStore({
  reducer: combineReducers({
    participants: participantsSlice.reducer,
    ordering: orderingSlice.reducer,
    current: currentSlice.reducer,
    status: statusSlice.reducer
  }),
  middleware: [storeLocal]
});

const getState = name => store.getState()[name];

export { store, getState };
