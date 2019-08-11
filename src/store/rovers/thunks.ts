import { Dispatch } from 'redux';

import { sleep } from 'utils';

import { AppState } from 'store/index';
import { playRover, startRover, stopRover } from './actions';

// Thunks
export const launchRover = (name: string, wait: number = 500) => async (dispatch: Dispatch, getState: () => AppState) => {
  let rover = getState().rovers[name];
  if (rover.active) return; // Already active ;)

  // Set rover active
  await dispatch(startRover(name));

  // Play !
  while (true) {
    let rover = getState().rovers[name];

    // Checks
    if (!rover.active) return; // stopped !
    if (rover.data.arrived) break; // arrived !

    // Play
    try {
      await Promise.all([
        dispatch(playRover(name)),
        sleep(wait)
      ]);
    } catch (err) {
      console.error("Error while playing :", err);
      throw err;
    }
  }

  // Set rover inactive
  await dispatch(stopRover(name));
};