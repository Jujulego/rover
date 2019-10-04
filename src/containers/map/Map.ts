import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Coords from 'data/Coords';

import { AppState } from 'store';
import { moveZone } from 'store/zone/actions';

import Map from 'components/map/Map';

// Component
function mapStateToProps(state: AppState) {
  let center = state.zone.center;
  let tracks;

  if (state.zone.track) {
    const tracked = state.rovers[state.zone.track];

    if (tracked) {
      tracks = tracked.data.pos;
    }
  }

  return {
    level: state.zone.level, map: state.zone.map,
    center, tracks, zoom: state.zone.zoom,
    options: state.zone.options,
    debug: state.zone.debug,
    rovers: state.rovers
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCenter: (v: Coords) => dispatch(moveZone(v))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)
