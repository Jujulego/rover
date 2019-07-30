import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { zoneReducer } from './zone/reducers';

// Root reducer
const rootReducer = combineReducers({
  zone: zoneReducer
});

export type AppState = ReturnType<typeof rootReducer>

// Store
const store = createStore(rootReducer, devToolsEnhancer({}));

export default store;
