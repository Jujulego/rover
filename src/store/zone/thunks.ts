import { Dispatch } from 'redux';

import Level from 'data/Level';

import { setLevel, setMap } from './actions';

// Thunks
export const loadLevel = (lvl: Level) => async (dispatch: Dispatch) => {
  dispatch(setLevel(lvl.name));

  const map = await lvl.loadMap();
  dispatch(setMap(map));
};
