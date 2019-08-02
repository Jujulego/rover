import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { roversReducer } from './rovers/reducers';
import { zoneReducer } from './zone/reducers';

// Root reducer
const rootReducer = combineReducers({
  rovers: roversReducer,
  zone: zoneReducer
});

export type AppState = ReturnType<typeof rootReducer>

// Store
const store = createStore(rootReducer, devToolsEnhancer({}));

export default store;
