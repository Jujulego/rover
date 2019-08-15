import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Coords, { equal } from 'data/Coords';
import CachedRover from 'data/rovers/bases/CachedRover';

import { AppState } from 'store';
import { moveZone } from 'store/zone/actions';

import Case from 'components/map/Case';

// Type
interface Props {
  pos: Coords
}

// Component
function mapStateToProps(state: AppState, own: Props) {
  const debug = state.zone.debug;
  let unknown = false;

  if (debug) {
    const rover = state.rovers[debug];
    if (rover.data instanceof CachedRover) {
      unknown = rover.data.getCachedCase(own.pos).floor === undefined;
    }
  }

  return {
    coords: state.zone.options.coords,
    height: state.zone.options.height,
    unknown, target: state.zone.level && equal(own.pos, state.zone.level.target)
  };
}

function mapDispatchToProps(dispatch: Dispatch, own: Props) {
  return {
    onClick: () => dispatch(moveZone(own.pos))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Case);