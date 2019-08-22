import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Coords, { equal } from 'data/Coords';
import Map from 'data/Map';
import CachedRover from 'data/rovers/bases/CachedRover';

import { AppState } from 'store';
import { moveZone } from 'store/zone/actions';
import { caseDrop } from 'store/zone/thunks';
import { handleAllowDrop, handleDrop } from 'store/zone/DropData';

import Case from 'components/map/Case';
import { hasCost } from 'data/rovers/bases/CostMixin';

// Type
interface Props {
  pos: Coords,
  map: Map
}

// Component
function mapStateToProps(state: AppState, own: Props) {
  // map data
  const data = own.map.get(own.pos);

  // debug data
  const { debug } = state.zone;
  let unknown = false;
  let cost: number | undefined;

  if (debug) {
    const rover = state.rovers[debug].data;

    if (rover instanceof CachedRover) {
      unknown = rover.getCachedCase(own.pos).floor === undefined;
    }

    if (hasCost(rover)) {
      cost = rover.getCost(own.pos);
    }
  }

  return {
    coords: state.zone.options.coords,
    height: state.zone.options.height ? data && data.height : undefined,
    unknown, cost,
    target: state.zone.level && equal(own.pos, state.zone.level.target),
    version: own.map.version,

    onAllowDrop: handleAllowDrop(state.zone.editing)
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState,{},any>, own: Props) {
  return {
    onClick: () => dispatch(moveZone(own.pos)),
    onDrop: handleDrop(data => dispatch(caseDrop(own.pos, data)))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Case);
