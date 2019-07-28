import { MOVE_ZONE } from "./constants";
import { ZoneActionTypes, ZoneState } from "./types";

// Initial state
const initialState: ZoneState = {
  center: { x: 0, y: 0 }
};

// Reducers
export function zoneReducer(state = initialState, action: ZoneActionTypes) {
  switch (action.type) {
    case MOVE_ZONE:
      return {
        ...state,
        center: action.center
      };

    default:
      return state;
  }
}