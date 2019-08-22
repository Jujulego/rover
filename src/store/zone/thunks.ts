import { Dispatch } from 'redux';

import Coords from 'data/Coords';
import Level from 'data/Level';

import { AppState } from 'store/index';
import { clearRovers } from 'store/rovers/actions';

import { DropData } from './DropData';
import {
  debugRover, setLevel, setMap, stopTracking,
  changeType
} from './actions';

// Thunks
export const loadLevel = (lvl: Level) => async (dispatch: Dispatch) => {
  // Set new level and reset params
  await Promise.all([
    dispatch(setLevel(lvl)),
    dispatch(clearRovers()),
    dispatch(stopTracking()),
    dispatch(debugRover(undefined))
  ]);

  // Load map
  const map = await lvl.loadMap();
  await dispatch(setMap(map));
};

export const caseDrop = (pos: Coords, data: DropData) => async (dispatch: Dispatch, getState: () => AppState) => {
  const map = getState().zone.map;
  if (!map) return;

  // Treating data
  switch (data.kind) {
    case 'type': dispatch(changeType(pos, data.type, map.getOrDefault(pos).floor))
  }
};