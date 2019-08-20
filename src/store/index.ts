import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { drawerReducer } from './drawer/reducers';
import { roversReducer } from './rovers/reducers';
import { zoneReducer } from './zone/reducers';

// Root reducer
const rootReducer = combineReducers({
  drawer: drawerReducer,
  rovers: roversReducer,
  zone: zoneReducer
});

export type AppState = ReturnType<typeof rootReducer>

// Store
const store = createStore(rootReducer, composeWithDevTools({})(
  applyMiddleware(thunk)
));

export default store;
