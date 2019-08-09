import { Dispatch } from 'redux';

import Level from 'data/Level';

import { clearRovers } from '../rovers/actions';
import { debugRover, setLevel, setMap, stopTracking } from './actions';

// Thunks
export const loadLevel = (lvl: Level) => async (dispatch: Dispatch) => {
  // Set new level and reset params
  await Promise.all([
    dispatch(setLevel(lvl)),
    dispatch(clearRovers()),
    dispatch(stopTracking()),
    dispatch(debugRover())
  ]);

  // Load map
  const map = await lvl.loadMap();
  await dispatch(setMap(map));
};
