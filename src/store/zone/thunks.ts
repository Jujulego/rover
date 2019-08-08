import { Dispatch } from 'redux';

import Level from 'data/Level';
import { ChristelleRover, PathRover, SimpleRover, StupidRover } from 'data/rovers';

import { addRover, clearRovers } from '../rovers/actions';
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

  // Add rovers
  await dispatch(addRover('stupid', new StupidRover(map, lvl.start, lvl.target, 'right'), 'blue'));
  await dispatch(addRover('christelle', new ChristelleRover(map, lvl.start, lvl.target), 'pink'));
  await dispatch(addRover('simple', new SimpleRover(map, lvl.start, lvl.target), 'green'));
  await dispatch(addRover('path', new PathRover(map, lvl.start, lvl.target), 'white'));
};
