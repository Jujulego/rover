import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Coords from 'data/Coords';

import { AppState } from 'store';
import { moveZone } from 'store/zone/actions';

import Map from 'components/map2/Map';

// Component
function mapStateToProps(state: AppState) {
  let center = state.zone.center;
  if (state.zone.track) {
    const tracked = state.rovers[state.zone.track];

    if (tracked) {
      center = tracked.data.pos;
    }
  }

  return {
    map: state.zone.map,
    target: state.zone.level && state.zone.level.target,
    center, zoom: state.zone.zoom, options: state.zone.options,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMove: (center: Coords) => dispatch(moveZone(center))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)
